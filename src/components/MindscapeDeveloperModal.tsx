import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import devCredentials from '../config/devCredentials.json';

interface MindscapeDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MindscapeDeveloperModal: React.FC<MindscapeDeveloperModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  const [paragraphs, setParagraphs] = useState(['', '']);

  if (!isOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === devCredentials.username && password === devCredentials.password) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials');
    }
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, '']);
  };

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = value;
    setParagraphs(newParagraphs);
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length > 1) {
      const newParagraphs = paragraphs.filter((_, i) => i !== index);
      setParagraphs(newParagraphs);
    }
  };

  const handleAddPage = () => {
    if (!pageTitle || !pageDescription) return;
    
    // Here you would typically handle the actual page creation
    console.log('Adding new mindscape page:', {
      title: pageTitle,
      description: pageDescription,
      paragraphs: paragraphs.filter(p => p.trim() !== '')
    });
    
    // Reset form
    setPageTitle('');
    setPageDescription('');
    setParagraphs(['', '']);
    
    alert('Page added successfully! (In development mode)');
  };

  const resetModal = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setAuthError('');
    setPageTitle('');
    setPageDescription('');
    setParagraphs(['', '']);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border-[3px] border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b-[2px] border-black">
          <h2 className="text-xl font-black">Mindscape Developer Mode</h2>
          <button 
            onClick={handleClose}
            className="hover:opacity-70 transition-opacity"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          {!isAuthenticated ? (
            /* Authentication Form */
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border-[2px] border-black focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border-[2px] border-black focus:outline-none"
                  required
                />
              </div>
              
              {authError && (
                <p className="text-red-600 text-sm font-bold">{authError}</p>
              )}
              
              <button
                type="submit"
                className="w-full bg-black text-white p-2 font-bold hover:opacity-80 transition-opacity"
              >
                LOGIN
              </button>
            </form>
          ) : (
            /* Page Creation Form */
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

              {/* Paragraphs */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-bold">Paragraphs:</label>
                  <button
                    onClick={addParagraph}
                    className="bg-black text-white px-3 py-1 text-sm font-bold hover:opacity-80 transition-opacity flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Paragraph
                  </button>
                </div>
                
                <div className="space-y-4">
                  {paragraphs.map((paragraph, index) => (
                    <div key={index} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold">Paragraph {index + 1}:</span>
                        {paragraphs.length > 1 && (
                          <button
                            onClick={() => removeParagraph(index)}
                            className="text-red-600 hover:opacity-70 text-sm font-bold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <textarea
                        value={paragraph}
                        onChange={(e) => updateParagraph(index, e.target.value)}
                        className="w-full p-2 border-[2px] border-black focus:outline-none h-24"
                        placeholder={`Enter paragraph ${index + 1} content`}
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
              
              <button
                onClick={handleAddPage}
                disabled={!pageTitle || !pageDescription}
                className="w-full bg-black text-white p-3 font-bold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                ADD PAGE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MindscapeDeveloperModal;