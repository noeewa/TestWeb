import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import devCredentials from '../config/devCredentials.json';

interface DeveloperModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeveloperModeModal: React.FC<DeveloperModeModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('Web Design');
  const [projectDescription, setProjectDescription] = useState('');

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleAddProject = () => {
    if (!projectTitle || !imageFile) return;
    
    // Here you would typically handle the actual upload
    console.log('Adding new project:', {
      title: projectTitle,
      category: projectCategory,
      description: projectDescription,
      image: imageFile
    });
    
    // Reset form
    setProjectTitle('');
    setProjectCategory('Web Design');
    setProjectDescription('');
    setImageFile(null);
    
    alert('Project added successfully! (In development mode)');
  };

  const resetModal = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setAuthError('');
    setImageFile(null);
    setProjectTitle('');
    setProjectCategory('Web Design');
    setProjectDescription('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border-[3px] border-black max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b-[2px] border-black">
          <h2 className="text-xl font-black">Developer Mode</h2>
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
            /* Upload Section */
            <div className="space-y-6">
              <h3 className="text-lg font-black border-b-[2px] border-black pb-2">Add New Project</h3>
              
              <div>
                <label className="block text-sm font-bold mb-2">Project Title:</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full p-2 border-[2px] border-black focus:outline-none"
                  placeholder="Enter project title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Category:</label>
                <select
                  value={projectCategory}
                  onChange={(e) => setProjectCategory(e.target.value)}
                  className="w-full p-2 border-[2px] border-black focus:outline-none"
                >
                  <option value="Web Design">Web Design</option>
                  <option value="Mobile Design">Mobile Design</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Branding">Branding</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Description:</label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full p-2 border-[2px] border-black focus:outline-none h-20"
                  placeholder="Enter project description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Upload Image:</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="w-full p-4 border-[2px] border-black border-dashed cursor-pointer hover:opacity-70 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Upload size={20} />
                    <span>{imageFile ? imageFile.name : 'Click to upload image'}</span>
                  </label>
                </div>
              </div>
              
              <button
                onClick={handleAddProject}
                disabled={!projectTitle || !imageFile}
                className="w-full bg-black text-white p-3 font-bold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                ADD PROJECT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperModeModal;