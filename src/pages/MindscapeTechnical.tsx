import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code } from 'lucide-react';

const MindscapeTechnical: React.FC = () => {
  const sections = [
    {
      title: "React & Modern Frontend",
      content: `Exploring the evolution of frontend development with React and its ecosystem. The component-based architecture has revolutionized how we think about user interfaces.

TypeScript integration brings type safety that scales beautifully with team size and project complexity. The development experience becomes significantly more predictable and maintainable.

Key insights from my journey:
- Component composition over inheritance
- State management patterns that scale
- Performance optimization strategies
- Testing approaches that provide confidence`
    },
    {
      title: "System Design Philosophy",
      content: `Building systems that are both robust and flexible requires careful architectural decisions. Every choice we make today impacts tomorrow's possibilities.

Clean architecture principles help create boundaries that protect against change. When requirements evolve, well-designed systems adapt gracefully rather than breaking.

Core principles I follow:
- Separation of concerns
- Dependency inversion
- Single responsibility
- Open for extension, closed for modification`
    },
    {
      title: "Development Workflow",
      content: `Efficient development workflows emerge from understanding both tools and team dynamics. The goal is to minimize friction while maximizing quality and velocity.

Automation serves as a force multiplier, but only when it solves real problems. Over-engineering early can create more overhead than benefit.

Workflow elements that matter:
- Version control strategies
- Code review practices
- Testing automation
- Deployment pipelines
- Documentation culture`
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Code className="text-cyan-400" size={20} />
            <span className="bg-cyan-400 text-black px-3 py-1 text-sm font-bold">
              Technical Topics & Development
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6" style={{ letterSpacing: '0.02em' }}>
            Technical
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl" style={{ wordSpacing: '0.1em', lineHeight: '1.8' }}>
            Deep dives into development practices, architecture decisions, and technical philosophy
          </p>
        </div>
      </header>

      {/* Content Sections */}
      <main className="px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section, index) => (
            <section key={index} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-[0.2px] h-8 bg-white/30 "></div>
                <h2 className="text-3xl font-black" style={{ letterSpacing: '0.01em' }}>
                  {section.title}
                </h2>
              </div>
              
              <div className="bg-black border-[0.1px] border-white/30 p-6">
                <div 
                  className="text-lg leading-relaxed whitespace-pre-line"
                  style={{ 
                    wordSpacing: '0.05em', 
                    letterSpacing: '0.02em',
                    lineHeight: '1.9'
                  }}
                >
                  {section.content}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Back to Mindscape */}
      <section className="py-16 text-center border-t border-gray-800">
        <h2 className="text-3xl font-black mb-4">Back to Mindscape</h2>
        <p className="text-lg text-gray-300 mb-8">
          Return to the main mindscape for personal reflections
        </p>
        <Link 
          to="/mindscape"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-bold hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Mindscape
        </Link>
      </section>

      {/* Footer Quote */}
      <footer className="py-8 text-center border-t border-gray-800">
        <p className="text-sm italic text-gray-400">
          "Technology is best when it brings people together"
        </p>
      </footer>
    </div>
  );
};

export default MindscapeTechnical;