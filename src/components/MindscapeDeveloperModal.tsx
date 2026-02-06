import React, { useEffect, useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';

interface MindscapeDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MindscapeDeveloperModal: React.FC<MindscapeDeveloperModalProps> = ({ isOpen, onClose }) => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tstat, setTstat] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Loading states
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoadingAddPage, setIsLoadingAddPage] = useState(false);
  
  // Register form states
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  
  // Page creation states
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  const [sections, setSections] = useState([
    { title: '', paragraphs: [''] }, 
    { title: '', paragraphs: [''] }
  ]);

  // Check auth status on mount and when modal opens
  useEffect(() => {
    if (isOpen) {
      updateAuthStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const updateAuthStatus = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/status", {
        credentials: "include"
      });
      const hasils = await res.json();
      if (hasils.status === true) {
        setTstat(true);
        setIsAuthenticated(true);
      } else {
        setTstat(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to fetch status:", error);
      setIsAuthenticated(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (registerPassword !== registerConfirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    if (registerUsername.length < 3) {
      setErrorMessage('Username must be at least 3 characters');
      return;
    }

    setIsLoadingRegister(true);

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          setIsRegisterMode(false);
          setRegisterUsername('');
          setRegisterPassword('');
          setRegisterConfirmPassword('');
          setSuccessMessage('');
        }, 2000);
      } else {
        setErrorMessage(data.message || data.error || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage('Connection error. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoadingRegister(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username || !password) {
      setErrorMessage('Please enter username and password');
      return;
    }

    setIsLoadingLogin(true);

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        setSuccessMessage('Login successful!');
        // Update auth status after successful login
        await updateAuthStatus();
      } else {
        setErrorMessage(data.message || data.error || 'Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('Connection error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const addSection = () => {
    setSections([...sections, { title: '', paragraphs: [''] }]);
  };

  const updateSection = (index: number, field: 'title', value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const addParagraphToSection = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].paragraphs.push('');
    setSections(newSections);
  };

  const updateParagraphInSection = (sectionIndex: number, paraIndex: number, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].paragraphs[paraIndex] = value;
    setSections(newSections);
  };

  const removeParagraphFromSection = (sectionIndex: number, paraIndex: number) => {
    const newSections = [...sections];
    if (newSections[sectionIndex].paragraphs.length > 1) {
      newSections[sectionIndex].paragraphs = newSections[sectionIndex].paragraphs.filter((_, i) => i !== paraIndex);
      setSections(newSections);
    }
  };

  const removeSection = (index: number) => {
    if (sections.length > 1) {
      const newSections = sections.filter((_, i) => i !== index);
      setSections(newSections);
    }
  };

  const handleAddPage = async () => {
    if (!pageTitle || !pageDescription) {
      setErrorMessage('Please fill in page title and description');
      return;
    }
    
    const validSections = sections.filter(s => s.title.trim() !== '' && s.paragraphs.some(p => p.trim() !== ''));
    
    setIsLoadingAddPage(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // 1. Create page (headline, subtitle)
      const pageRes = await fetch('http://localhost:3000/api/createPage', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headline: pageTitle,
          subtitle: pageDescription,
          sections,
        })
      });
      
      const pageData = await pageRes.json();
      if (!pageRes.ok || !pageData.success) throw new Error(pageData.message || 'Failed to create page');
      
      const page_id = pageData.id;
      
      // 2. Create content with valid sections
      for (const section of validSections) {
        const contentRes = await fetch('http://localhost:3000/api/create/content', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: section.title,
            page_id: page_id
          })
        });
        
        const contentData = await contentRes.json();
        if (!contentRes.ok || !contentData.success) throw new Error('Failed to create content');
        
        const content_id = contentData.id;
        
        // 3. Create paragraphs for this section
        const paragraphs = section.paragraphs.filter(p => p.trim() !== '');
        for (const para of paragraphs) {
          await fetch('http://localhost:3000/api/create/paragraf', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content_id: content_id,
              paragraf: para
            })
          });
        }
      }
      
      setPageTitle('');
      setPageDescription('');
      setSections([
        { title: '', paragraphs: [''] }, 
        { title: '', paragraphs: [''] }
      ]);
      
      setSuccessMessage('Page added successfully!');
    } catch (error) {
      console.error('Error adding page:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to add page. Please try again.');
    } finally {
      setIsLoadingAddPage(false);
    }
  };

  const resetModal = () => {
    setIsAuthenticated(tstat);
    setUsername('');
    setPassword('');
    setErrorMessage('');
    setSuccessMessage('');
    setPageTitle('');
    setPageDescription('');
    setSections([
      { title: '', paragraphs: [''] }, 
      { title: '', paragraphs: [''] }
    ]);
    setIsRegisterMode(false);
    setRegisterUsername('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border-[3px] border-black max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b-[2px] border-black">
          <h2 className="text-xl font-black">Developer</h2>
          <button 
            onClick={handleClose}
            className="hover:opacity-70 transition-opacity"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          {/* Login Container - Separate Section */}
          {!isAuthenticated && !isRegisterMode && (
            <div className="p-2">
              <h3 className="text-lg font-black border-b-[1px] border-black pb-2 mb-4">LOGIN</h3>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border-[1px] bg-gray-300 border-black focus:outline-none"
                    disabled={isLoadingLogin}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border-[1px] bg-gray-300 border-black focus:outline-none"
                    disabled={isLoadingLogin}
                    required
                  />
                </div>
                
                {errorMessage && (
                  <p className="text-red-600 text-sm font-bold">{errorMessage}</p>
                )}
                
                {successMessage && (
                  <p className="text-green-600 text-sm font-bold">{successMessage}</p>
                )}
                
                <div 
                  className='text-[14px] text-right cursor-pointer text-blue-600 hover:underline'
                  onClick={() => {
                    setIsRegisterMode(true);
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                >
                  Register
                </div>
                
                <button
                  type="submit"
                  disabled={isLoadingLogin}
                  className="w-full bg-black text-white p-2 font-bold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoadingLogin ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      LOADING...
                    </>
                  ) : (
                    'LOGIN'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Registration Container - Separate Section */}
          {!isAuthenticated && isRegisterMode && (
            <div className="p-2">
              <h3 className="text-lg font-black border-b-[1px] border-black pb-2 mb-4">REGISTER</h3>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Username:</label>
                  <input
                    type="text"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    className="w-full p-2 border-[1px] bg-gray-300 border-black focus:outline-none"
                    disabled={isLoadingRegister}
                    required
                    minLength={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Password:</label>
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full p-2 border-[1px] bg-gray-300 border-black focus:outline-none"
                    disabled={isLoadingRegister}
                    required
                    minLength={6}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Confirm Password:</label>
                  <input
                    type="password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className="w-full p-2 border-[1px] bg-gray-300 border-black focus:outline-none"
                    disabled={isLoadingRegister}
                    required
                  />
                </div>
                
                {errorMessage && (
                  <p className="text-red-600 text-sm font-bold">{errorMessage}</p>
                )}
                
                {successMessage && (
                  <p className="text-green-600 text-sm font-bold">{successMessage}</p>
                )}
                
                <div 
                  className='text-[14px] text-right cursor-pointer text-blue-600 hover:underline'
                  onClick={() => {
                    setIsRegisterMode(false);
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                >
                  Back to Login
                </div>
                
                <button
                  type="submit"
                  disabled={isLoadingRegister}
                  className="w-full bg-black text-white p-2 font-bold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoadingRegister ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      REGISTERING...
                    </>
                  ) : (
                    'REGISTER'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Page Creation Form - Shown when authenticated */}
          {isAuthenticated && (
            <div className="space-y-6">
              <h3 className="text-lg font-black border-b-[2px] border-black pb-2">Add New Mindscape Page</h3>
              
              <div>
                <label className="block text-sm font-bold mb-2">Page Title:</label>
                <input
                  type="text"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="w-full p-2 border-[2px] border-black focus:outline-none"
                  placeholder="Enter page title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Description:</label>
                <textarea
                  value={pageDescription}
                  onChange={(e) => setPageDescription(e.target.value)}
                  className="w-full p-2 border-[2px] border-black focus:outline-none h-20"
                  placeholder="Enter page description"
                />
              </div>

              {/* Sections */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-bold">Sections:</label>
                  <button
                    onClick={addSection}
                    className="bg-black text-white px-3 py-1 text-sm font-bold hover:opacity-80 transition-opacity flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Section
                  </button>
                </div>
                
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <div key={index} className="relative p-4 border-[2px] border-black">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold">Section {index + 1}:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => addParagraphToSection(index)}
                            className="bg-black text-white p-1 hover:opacity-80 transition-opacity"
                            title="Add Paragraph"
                          >
                            <Plus size={14} />
                          </button>
                          {sections.length > 1 && (
                            <button
                              onClick={() => removeSection(index)}
                              className="text-red-600 hover:opacity-70 text-sm font-bold"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        className="w-full p-2 border-[1px] border-black focus:outline-none mb-2"
                        placeholder={`Enter section ${index + 1} title`}
                      />
                      <div className="space-y-2">
                        {section.paragraphs.map((para, paraIndex) => (
                          <div key={paraIndex} className="relative">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold">Paragraph {paraIndex + 1}:</span>
                              {section.paragraphs.length > 1 && (
                                <button
                                  onClick={() => removeParagraphFromSection(index, paraIndex)}
                                  className="text-red-500 hover:opacity-70 text-xs font-bold"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <textarea
                              value={para}
                              onChange={(e) => updateParagraphInSection(index, paraIndex, e.target.value)}
                              className="w-full p-2 border-[1px] border-black focus:outline-none h-20"
                              placeholder={`Enter paragraph ${paraIndex + 1}`}
                              style={{
                                lineHeight: '1.6',
                                letterSpacing: '0.025em',
                                wordSpacing: '0.1em'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleAddPage}
                disabled={!pageTitle || !pageDescription || isLoadingAddPage}
                className="w-full bg-black text-white p-3 font-bold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoadingAddPage ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    ADDING...
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    ADD PAGE
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MindscapeDeveloperModal;
