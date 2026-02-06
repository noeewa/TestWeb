import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  type: string;
  placeholder?: string;
  description?: string;
  link?: string;
  items?: Array<{
    id: string;
    title: string;
    placeholder: string;
    description: string;
    link?: string;
  }>;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  projects: Project[];
  onNavigate: (direction: 'prev' | 'next') => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  project,
  projects,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        onNavigate('next');
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);
  useEffect(() => {
    document.querySelector('#itemscroll')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const renderProjectContent = () => {
    
    if (project.type === 'triple' && project.items) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.items.map((item) => (
            <div key={item.id} className="space-y-2">
              <img
                src={item.placeholder}
                alt={item.title}
                className="w-full h-fit object-cover rounded border border-border"
              />
              <h4 className="font-bold text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" ><p className="text-sm text-blue-500 hover:underline">{item.link}</p></a>
            </div>
          ))}
          <a href={project.link} target="_blank" rel="noopener noreferrer" className='mb-4' ><p className="absolute text-sm w-full text-blue-500 hover:underline">{project.link}</p></a>
        </div>
      );
    }
    
    if (project.type === 'double' && project.items) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.items.map((item) => (
            <div key={item.id} className="space-y-2">
              <img
                src={item.placeholder}
                alt={item.title}
                className="w-full h-64 object-cover rounded border border-border"
              />
              <h4 className="font-bold text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" ><p className="text-sm text-blue-500 hover:underline">{item.link}</p></a>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {project.placeholder && (
          <img
            src={project.placeholder}
            alt={project.title}
            className="w-full max-h-full object-cover rounded border border-border"
          />
        )}
        {project.description && (
          <p className="text-muted-foreground">{project.description}</p>
        )}
        {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" ><p className="text-sm text-blue-600 hover:underline">{project.link}</p></a>}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-background border-2 border-foreground max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div>
            <h2 className="font-black">{project.title}</h2>
            <p className="text-sm text-muted-foreground">{project.category}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6" id="itemscroll">
          {renderProjectContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center p-6 border-t border-border">
          <button
            onClick={() => onNavigate('prev')}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 transition-colors font-medium"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <span className="text-sm text-muted-foreground">
            {projects.findIndex(p => p.id === project.id) + 1} / {projects.length}
          </span>
          
          <button
            onClick={() => onNavigate('next')}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 transition-colors font-medium"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;