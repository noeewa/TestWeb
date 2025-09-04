import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Settings } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import GalleryModal from '../components/GalleryModal';
import DeveloperModeModal from '../components/DeveloperModeModal';

const Gallery: React.FC = () => {
  const { gallery } = siteConfig;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeveloperModeOpen, setIsDeveloperModeOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const filteredProjects = gallery.projects.filter(project => 
    activeCategory === 'All' || project.category === activeCategory
  );

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
    } else {
      newIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedProject(filteredProjects[newIndex]);
  };

  const renderProject = (project: any, size: 'large' | 'medium' | 'small' | 'full') => {
    const heights = {
      large: 'h-80 lg:h-96',
      medium: 'h-48 lg:h-64',
      small: 'h-40 lg:h-48',
      full: 'h-full'
    };

    if (project.type === 'triple' && project.items) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          {project.items.map((item: any) => (
            <div
              key={item.id}
              onClick={() => handleProjectClick(project)}
              className="card-brutal p-0 overflow-hidden cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              <img
                src={item.placeholder}
                alt={item.alt}
                className={`w-full ${heights.small} object-cover`}
              />
            </div>
          ))}
        </div>
      );
    }

    if (project.type === 'double' && project.items) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {project.items.map((item: any) => (
            <div
              key={item.id}
              onClick={() => handleProjectClick(project)}
              className="card-brutal p-0 overflow-hidden cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              <img
                src={item.placeholder}
                alt={item.alt}
                className={`w-full ${heights.medium} object-cover`}
              />
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div
        onClick={() => handleProjectClick(project)}
        className="card-brutal p-0 overflow-hidden cursor-pointer hover:opacity-70 transition-opacity duration-200"
      >
        <img
          src={project.placeholder}
          alt={project.alt}
          className={`w-full ${heights[size]} object-cover`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-8 px-6 border-b-[3px] border-black">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {gallery.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`btn-brutal text-sm ${
                  activeCategory === category 
                    ? 'bg-black text-white' 
                    : 'bg-background text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <h1 className="text-4xl font-black mb-4">{gallery.title}</h1>
          <p className="text-lg">{gallery.subtitle}</p>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="px-4 lg:px-6 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Projects Grid */}
          <div className="space-y-8 lg:space-y-12">
            {filteredProjects.map((project, index) => {
              // Create responsive layout pattern
              if (index === 0) {
                // First project - large featured
                return (
                  <div key={project.id} className="space-y-4">
                    <h3 className="text-lg lg:text-xl font-black">{project.title}</h3>
                    {renderProject(project, 'large')}
                  </div>
                );
              }
              
              if (project.type === 'triple') {
                return (
                  <div key={project.id} className="space-y-4">
                    <h3 className="text-lg lg:text-xl font-black">{project.title}</h3>
                    {renderProject(project, 'small')}
                  </div>
                );
              }
              
              if (project.type === 'double') {
                return (
                  <div key={project.id} className="space-y-4">
                    <h3 className="text-lg lg:text-xl font-black">{project.title}</h3>
                    {renderProject(project, 'medium')}
                  </div>
                );
              }
              
              // Single projects in a responsive grid
              return (
                <div key={project.id} className="space-y-4">
                  <h3 className="text-lg lg:text-xl font-black">{project.title}</h3>
                  {renderProject(project, 'large')}
                </div>
              );
            })}
          </div>

          {/* Exit Button */}
          <div className="text-center pt-8">
            <button 
              onClick={() => navigate('/')}
              className="bg-black text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-gray-800 transition-colors"
            >
              <X size={16} />
              EXIT
            </button>
          </div>
        </div>
      </main>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        projects={filteredProjects}
        onNavigate={handleNavigate}
      />

      {/* Developer Mode Modal */}
      <DeveloperModeModal
        isOpen={isDeveloperModeOpen}
        onClose={() => setIsDeveloperModeOpen(false)}
      />

      {/* Footer */}
      <footer className="py-8 text-center border-t-[3px] border-black relative">
        <p className="text-sm">{siteConfig.footer.copyright}</p>
        
        {/* Developer Mode Button */}
        <button
          onClick={() => setIsDeveloperModeOpen(true)}
          className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full hover:opacity-70 transition-opacity"
          title="Developer Mode"
        >
          <Settings size={16} />
        </button>
      </footer>
    </div>
  );
};

export default Gallery;