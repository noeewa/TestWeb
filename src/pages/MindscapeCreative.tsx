import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb } from 'lucide-react';


const MindscapeCreative: React.FC<{}> = ({}) => {
  const sections = [
    {
      title: "Design Thinking",
      content: `Design is not just about making things look beautiful—it's about solving problems through empathy and understanding. Every design decision should serve a purpose.

User experience begins with understanding the human behind the screen. When we design with genuine care for the user's journey, the interface becomes intuitive and delightful.

Design principles I embrace:
- Simplicity over complexity
- Function drives form
- Accessibility is not optional
- Iterate based on real feedback
- Design systems create consistency`
    },
    {
      title: "Creative Process",
      content: `Creativity thrives within constraints. The most innovative solutions often emerge when we have clear boundaries to work within.

The creative process is non-linear. Ideas need time to marinate, evolve, and sometimes completely transform into something unexpected but better.

My creative workflow:
- Research and immersion phase
- Ideation without judgment
- Rapid prototyping and testing
- Refinement through iteration
- Documentation for future reference`
    },
    {
      title: "Visual Storytelling",
      content: `Every interface tells a story. The narrative unfolds through visual hierarchy, color choices, typography, and the flow between different states.

Good visual design is invisible—it guides users naturally through their journey without drawing attention to itself. The best interfaces feel like extensions of human thought.

Storytelling elements:
- Visual hierarchy guides attention
- Color psychology influences emotion
- Typography sets the tone
- White space provides breathing room
- Animation adds personality and feedback`
    },
    {
      title: "Innovation Mindset",
      content: `True innovation happens at the intersection of technology and human needs. It's not about using the latest tools, but about solving real problems in meaningful ways.

The future belongs to those who can bridge the gap between what's possible and what's needed. Innovation requires both technical capability and deep empathy.

Innovation drivers:
- Question existing assumptions
- Embrace experimental thinking
- Learn from diverse perspectives
- Focus on impact over novelty
- Balance ambition with pragmatism`
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Lightbulb className="text-purple-400" size={20} />
            <span className="bg-purple-400 text-black px-3 py-1 text-sm font-bold">
              Creative Insights & Design Philosophy
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6" style={{ letterSpacing: '0.02em' }}>
            Creative
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl" style={{ wordSpacing: '0.1em', lineHeight: '1.8' }}>
            Exploring the intersection of creativity, design, and human-centered innovation
          </p>
        </div>
      </header>

      {/* Content Sections */}
      <main className="px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section, index) => (
            <section key={index} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-[0.2px] h-8 bg-white/30"></div>
                <h2 className="text-3xl font-black" style={{ letterSpacing: '0.01em' }}>
                  {section.title}
                </h2>
              </div>
              
              <div className="bg-black border-[0.5px] border-white/30 p-6">
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
          "Creativity is intelligence having fun"
        </p>
      </footer>
    </div>
  );
};

export default MindscapeCreative;