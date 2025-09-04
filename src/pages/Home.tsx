import React, { useEffect, useLayoutEffect } from 'react';
import { Link, } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import ScrollingQuotes from '../components/ScrollingQuotes';
import WorkflowSlider from '../components/WorkflowSlider';
import TimelineSlider from '../components/TimelineSlider';
import { ArrowLeft, Instagram, Github, Mail, Linkedin, MapPin } from 'lucide-react';


const Home: React.FC<{
    posisi: number; setPosisi: React.Dispatch<React.SetStateAction<number>>
  }> = ({posisi, setPosisi}) => {
  const { profile, about, contact, navigation } = siteConfig;
  useLayoutEffect(() => {
    window.scrollTo({top: posisi, behavior: 'smooth'});
    return () => {
      if (posisi >= 0) {
        setPosisi(window.scrollY);
        console.log('Saving scroll position:', window.scrollY);
      } else {
        console.log('No scroll position to save');
        return;
      }
    };
  }, []);
  // navigate

  return (
    <div className="min-h-screen">
      {/* Banner Section - Black Background */}
      <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center relative">
        <div 
          className=""
          onClick={() => {
            document.querySelector('#lobby-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        >
          <div className="text-center flex justify-center">
            <img src={siteConfig.profile.bannerImage} alt="Banner" className="w-3/4 h-auto banner-scale cursor-pointer " />
          </div>
          
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <div className="-translate-y-10 w-4 h-8 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Scrolling Quotes */}
      <ScrollingQuotes />

      {/* Lobby Section - White Background */}
      {/* Test Page */}
      {/* Header */}
      <section id="lobby-section" className='p-20'>
      {/* Profile Section */}
      <main className="px-6 pb-16 ">
        <div className="max-w-4xl mx-auto">
          <div className="flex lg:flex-row sm:flex-col items-center">
            <div className="flex flex-col lg:flex-col gap-12 items-start">
              <div className="max-w-4xl flex flex-col text-left">
                <div className="flex justify-self-start items-start gap-2 mb-8 w-fit">
                  <span className="bg-cyan-400 text-black px-3 py-1 text-sm font-bold">
                    Available for new projects
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6">
                  {profile.name}
                </h1>
              </div>
              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-4">{profile.role}</h2>
                <p className="text-lg text-gray-900 mb-8">{profile.description}</p>
                
                {/* Navigation Buttons */}
                <div className="flex gap-4 mb-8">
                  <Link to="/mindscape" className="bg-white btn-brutal text-2xl flex align-middle items-center text-black px-4 py-2 font-bold hover:bg-gray-200 transition-colors">
                    Mindscape
                  </Link>
                  <Link to="/gallery" className="bg-white btn-brutal flex align-middle items-center text-black px-4 py-2 font-bold hover:bg-gray-200 transition-colors">
                    Gallery
                  </Link>
                  <a href="http://www.instagram.com/altha.cra" target="_blank" rel="noopener noreferrer" className="bg-white flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
                  <button className='text-black font-bold btn-brutal px-4 py-2 w-full h-full' >
                    Instagram
                  </button>
                  </a>
                  <a href="https://form.typeform.com/to/aCNLSr9B" target="_blank" rel="noopener noreferrer" className="bg-white flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
                  <button className='text-black font-bold btn-brutal px-4 py-2 w-full h-full' >
                    Client?
                  </button>
                  </a>
                </div>
              </div>
            </div>
            {/* Profile Image */}
            <div className="w-80 h-80 rounded-full shadow-2xl  shadow-neutral-700/60 overflow-hidden bg-gray-900 flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-4xl"><img src={siteConfig.profile.profileImage} alt="" /></span>
            </div>
          </div>
          
          {/* About Me Section */}
          <section className="mt-44">
            <h2 className="text-3xl font-black mb-8">About Me</h2>
            <div className="border-2 p-6 mb-8">
              <p className="text-lg mb-4">{about.description}</p>
              <p className="text-lg mb-4">{about.details}</p>
              <p className="text-lg">{about.currentWork}</p>
            </div>
            
            {/* Contact Info */}
            <div className="flex gap-4">
              <div className="border-2 px-4 py-2 flex items-center gap-2">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
              <div className="border-2 px-4 py-2 flex items-center gap-2">
                <Mail size={16} />
                <span>{profile.email}</span>
              </div>
            </div>
          </section>
          {/* Social Links */}
          <section className="mt-16 flex gap-4">
            <a href="https://github.com/noeewa" target="_blank" rel="noopener noreferrer" className="bg-white btn-brutal p-3 flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
            <Github size={20} />
            </a>
            <a href="http://www.instagram.com/altha.cra" target="_blank" rel="noopener noreferrer" className="bg-white btn-brutal p-3 flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
            <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/althacra2025/" target="_blank" rel="noopener noreferrer" className="bg-white btn-brutal p-3 flex align-middle items-center text-black  font-bold hover:bg-gray-200 transition-colors">
            <Linkedin size={20} />
            </a>
          </section>

          
        </div>
      </main>
      </section>
      {/* About Me Section */}

      {/* Interest Section */}
      <section className="bg-background py-16 border-t-4 border-black">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-brutal p-6">
              <h3 className="text-2xl font-black mb-4">{about.skills.frontend.title}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Expert Level:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {about.skills.frontend.expert.map((skill) => (
                      <span key={skill} className="btn-brutal text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Intermediate:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {about.skills.frontend.intermediate.map((skill) => (
                      <span key={skill} className="btn-brutal text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Beginner:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {about.skills.frontend.beginner.map((skill) => (
                      <span key={skill} className="btn-brutal text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-brutal p-6">
              <h3 className="text-2xl font-black mb-4">{about.skills.backend.title}</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-lg btn-brutal">{about.skills.backend.skills[0]}</span>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <WorkflowSlider />

      {/* Timeline Section */}
      <TimelineSlider />

      {/* Contact Section */}
      <section className="bg-background py-16 border-t-4 border-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-4">{contact.title}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">{contact.description}</p>
          <a href="https://form.typeform.com/to/aCNLSr9B" target="_blank" rel="noopener noreferrer" className='w-fit'>
          <button className="btn-brutal text-xl py-4 px-8">
            {contact.cta}
          </button></a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 text-center">
        <p className="mb-2">{siteConfig.footer.copyright}</p>
        <p className="text-sm italic">{siteConfig.footer.note}</p>
      </footer>
    </div>
  );
};

export default Home;