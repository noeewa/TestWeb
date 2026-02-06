import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Terminal } from 'lucide-react';

const Developer: React.FC = () => {
  const topics = [
    {
      title: "React & TypeScript",
      content: `Exploring the power of TypeScript in React development. Type safety brings confidence to large-scale applications and improves developer experience significantly.

The combination of React's component-based architecture with TypeScript's static typing creates a robust foundation for modern web applications.

Key benefits I've experienced:
- Better IDE support and autocomplete
- Compile-time error detection
- Improved code documentation
- Enhanced refactoring capabilities`
    },
    {
      title: "System Architecture",
      content: `Designing scalable and maintainable system architectures requires careful consideration of various factors including performance, security, and maintainability.

Clean architecture principles help separate concerns and create loosely coupled systems that are easier to test and modify.

Modern approaches I focus on:
- Component-driven development
- State management patterns
- API design principles
- Performance optimization strategies`
    },
    {
      title: "Development Workflow",
      content: `Establishing efficient development workflows is crucial for productivity and code quality. This includes version control strategies, testing approaches, and deployment pipelines.

Automation and tooling play a significant role in maintaining consistent code quality and reducing manual errors.

Tools and practices I utilize:
- Git workflow optimization
- Automated testing strategies
- CI/CD pipeline design
- Code review processes`
    },
    {
      title: "Learning Philosophy",
      content: `Continuous learning in technology requires a balanced approach between depth and breadth. Understanding fundamentals while staying current with emerging trends.

The key is building a strong foundation that allows for quick adaptation to new technologies and paradigms.

My learning approach:
- Focus on fundamentals first
- Practice through real projects
- Community engagement
- Knowledge sharing through documentation`
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Terminal className="text-cyan-400" size={20} />
            <span className="bg-cyan-400 text-black px-3 py-1 text-sm font-bold">
              Technical Topics & Insights
            </span>
          </div>
          
          <h1 className="font-black mb-6">
            Developer Mode
          </h1>
          
          <p className="text-gray-300 max-w-2xl">
            Technical perspectives, development insights, and code philosophy
          </p>
        </div>
      </header>

      {/* Content Sections */}
      <main className="px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {topics.map((topic, index) => (
            <section key={index} className="space-y-6">
              {/* Topic Header */}
              <div className="flex items-center gap-3">
                <Code className="text-cyan-400" size={24} />
                <h2 className="font-black">
                  {topic.title}
                </h2>
              </div>
              
              {/* Content */}
              <div className="bg-gray-900 border-l-4 border-cyan-400 p-6">
                <div 
                  className="whitespace-pre-line space-y-6"
                >
                  {topic.content}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Back to Mindscape */}
      <section className="py-16 text-center border-t border-gray-800">
        <h2 className="font-black mb-4">Back to Thoughts</h2>
        <p className="text-gray-300 mb-8">
          Return to the mindscape for personal reflections and journey
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
          "Code is poetry written in logic"
        </p>
      </footer>
    </div>
  );
};

export default Developer;