import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Lokeshwaran P</h3>
            <p className="text-gray-300">
              Building innovative solutions at the intersection of embedded systems and web technologies.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/expertise" className="text-gray-300 hover:text-white transition-colors">
                  Expertise
                </a>
              </li>
              <li>
                <a href="/tech-stack" className="text-gray-300 hover:text-white transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-300 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/resume.pdf" target='_blank' className="text-gray-300 hover:text-white transition-colors">
                  Resume
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/Lokesh-Spectre"
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/lokeshwaran-prithivirajan-25a22128b"
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:lokeshwaran.p2004@gmail.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Lokeshwaran P. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;