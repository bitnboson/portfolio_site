import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Code, Cpu, Boxes } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const getNavItemClass = (path: string) => {
    return `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      location.pathname === path
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-600 hover:text-indigo-600'
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 font-semibold">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/expertise" className={getNavItemClass('/expertise')}>
              <Cpu size={20} />
              <span>Expertise</span>
            </Link>
            <Link to="/tech-stack" className={getNavItemClass('/tech-stack')}>
              <Code size={20} />
              <span>Tech Stack</span>
            </Link>
            <Link to="/projects" className={getNavItemClass('/projects')}>
              <Boxes size={20} />
              <span>Projects</span>
            </Link>
            {/* <Link to="/blog" className={getNavItemClass('/blog')}>
              <BookOpen size={20} />
              <span>Blog</span>
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;