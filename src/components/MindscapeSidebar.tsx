import React, { useState } from 'react';
import { Menu, X, Home, User, Grid, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MindscapeSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MindscapeSidebar: React.FC<MindscapeSidebarProps> = ({ isOpen, onToggle }) => {
  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Gallery', href: '/gallery', icon: Grid },
  ];

  const mindscapePages = [
    { name: 'Main Mindscape', href: '' },
    { name: '19 September 2025', href: 'pre-fase' },
  ];

  return (
    <>
      {/* Menu Trigger Button - Moves with sidebar */}
      <button
        onClick={onToggle}
        className={`fixed top-20 z-50 p-2 bg-white text-black hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-md ${
          isOpen ? 'left-64 lg:left-64 sm:justify-self-end md:justify-self-end xs:justify-self-end' : 'left-4'
        }`}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full md:w-80 bg-black border-r-[0.5px] border-white/30 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 pt-16 border-b border-gray-700">
          <h2 className="text-2xl font-black">NAVIGATION</h2>
          <p className="text-gray-400 text-sm mt-2">Explore different sections</p>
        </div>

        {/* Menu Items */}
        <nav className="p-6">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={onToggle}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <item.icon size={20} className="text-gray-400 group-hover:text-white" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
            
            {/* Mindscape Section */}
            <li>
              <div className="flex items-center gap-3 p-3 text-gray-300">
                <User size={20} className="text-gray-400" />
                <span className="font-medium">Mindscape</span>
              </div>
              <ul className="ml-8 mt-2 space-y-2">
                {mindscapePages.map((page) => (
                  <li key={page.name}>
                    <Link
                      to={page.href}
                      onClick={onToggle}
                      className="block p-2 rounded-lg hover:bg-gray-800 transition-colors text-sm text-gray-300 hover:text-white"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            Navigate through different sections of the portfolio
          </p>
        </div>
      </div>
    </>
  );
};

export default MindscapeSidebar;