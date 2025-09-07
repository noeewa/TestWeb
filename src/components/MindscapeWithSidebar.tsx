import React, { useState } from 'react';
import { Code, Settings } from 'lucide-react';
import MindscapeSidebar from './MindscapeSidebar';
import MindscapeDeveloperModal from './MindscapeDeveloperModal';
import { Outlet } from 'react-router-dom';

const MindscapeWithSidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [developerModalOpen, setDeveloperModalOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  React.useLayoutEffect(() => {
    alert("⚠️ Masih dalam Template");
    return () => {
      console.log("🧹 Cleanup saat komponen unmount");
    };
  }, []);

  return (
    <div className="relative">
      {/* Sidebar Component */}
      <MindscapeSidebar 
        isOpen={sidebarOpen} 
        onToggle={handleToggleSidebar} 
      />
      
      {/* Original Mindscape Content */}
      <div className="relative">
        <Outlet />
      </div>
      <button
            onClick={() => setDeveloperModalOpen(true)}
            className="absolute bottom-4 right-4 flex justify-self-end items-center bg-white text-black px-2 py-2 rounded-full font-bold hover:bg-white/80 transition-colors"
          >
            <Settings size={16} />
        </button>
      {/* Developer Mode Modal */}
      <MindscapeDeveloperModal
        isOpen={developerModalOpen}
        onClose={() => setDeveloperModalOpen(false)}
      />
    </div>
  );
};

export default MindscapeWithSidebar;