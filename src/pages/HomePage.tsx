import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, ArrowRight, DownloadIcon, ViewIcon, EyeIcon, GitBranchPlus, GitGraphIcon, GithubIcon } from 'lucide-react';
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";

const HomePage: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      <header className="min-h-screen flex flex-col justify-center relative bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900 px-4">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              opacity: 0
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 30,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 160,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
        <div className="max-w-4xl mx-auto w-full relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-violet-300 to-indigo-300 text-transparent bg-clip-text">LOKESHWARAN P</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            A third-year Computer Science student passionate about backend development,
            embedded systems, and creating efficient software solutions.
          </p>
          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <a href="https://github.com/Lokesh-Spectre" 
                 className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                <GithubIcon size={20} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/lokeshwaran-prithivirajan-25a22128b" 
                 className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a href="/resume.pdf" target='_blank'
                 className="flex items-center gap-2 px-6 py-3 bg-yellow-700 text-white rounded-lg hover:bg-violet-700 transition-colors">
                <EyeIcon size={20} />
                Resume (PDF)
              </a>
            </div>
            <Link 
              to="/expertise" 
              className="inline-flex items-center gap-2 text-white/90 hover:text-white group transition-colors"
            >
              Explore my work 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomePage;