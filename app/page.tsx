'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, FileText, User } from 'lucide-react';

interface Dot {
  id: number;
  x: number;
  y: number;
  duration: number;
  key: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  date: string;
  link?: string;
  doi?: string;
}

export default function Home() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Generate initial dots
    const initialDots: Dot[] = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 5 + Math.random() * 7,
      key: 0,
    }));
    setDots(initialDots);

    // Schedule each dot to update independently
    const timers: NodeJS.Timeout[] = [];

    const scheduleNextUpdate = (dotIndex: number, duration: number) => {
      const timer = setTimeout(() => {
        setDots((prevDots) => {
          const newDots = [...prevDots];
          const newDuration = 5 + Math.random() * 5;
          newDots[dotIndex] = {
            ...newDots[dotIndex],
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: newDuration,
            key: prevDots[dotIndex].key + 1,
          };
          return newDots;
        });

        scheduleNextUpdate(dotIndex, 5 + Math.random() * 5);
      }, duration * 1000);

      timers.push(timer);
    };

    initialDots.forEach((dot, index) => {
      scheduleNextUpdate(index, dot.duration);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const projects: Project[] = [
    {
      id: '1',
      title: 'Project Name',
      description: 'Brief description of what this project does and the technologies used. This is a placeholder that you can update.',
      tags: ['React', 'TypeScript', 'Next.js'],
      github: '#',
      link: '#',
    },
    {
      id: '2',
      title: 'Another Project',
      description: 'Another exciting project with innovative features. More details coming soon as you develop this project.',
      tags: ['Python', 'FastAPI', 'AI/ML'],
      github: '#',
      link: '#',
    },
    {
      id: '3',
      title: 'Research Project',
      description: 'Collaborative research project exploring new frontiers. Details will be added as the project progresses.',
      tags: ['Data Science', 'Machine Learning'],
      github: '#',
    },
  ];

  const publications: Publication[] = [
    {
      id: '1',
      title: 'Publication Title Coming Soon',
      authors: ['Your Name', 'Co-author'],
      venue: 'Conference/Journal Name',
      date: '2025',
      link: '#',
    },
    {
      id: '2',
      title: 'Another Research Paper',
      authors: ['Your Name'],
      venue: 'Academic Venue',
      date: '2024',
      doi: '10.xxxx/xxxxx',
    },
  ];

  const experience = [
    {
      company: 'Current Company',
      role: 'Position Title',
      period: '2024 - Present',
      description: 'What you do here and key accomplishments.',
      logo: '🏢',
    },
    {
      company: 'Previous Company',
      role: 'Previous Role',
      period: '2023 - 2024',
      description: 'Experience and projects you worked on.',
      logo: '🔧',
    },
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .fade-dot {
          animation: fadeInOut var(--duration) ease-in-out forwards;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.6s ease-out;
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.6); }
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .section-transition {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Animated background dots */}
      {dots.map((dot) => (
        <div
          key={`${dot.id}-${dot.key}`}
          className="fade-dot fixed rounded-full bg-white pointer-events-none"
          style={{
            width: '2.4px',
            height: '2.4px',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            '--duration': `${dot.duration}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold">Sayan</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {[
              { label: 'About', id: 'about' },
              { label: 'Projects', id: 'projects' },
              { label: 'Experience', id: 'experience' },
              { label: 'Publications', id: 'publications' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 border-t border-gray-700">
            <div className="flex flex-col gap-4 px-6 py-4">
              {[
                { label: 'About', id: 'about' },
                { label: 'Projects', id: 'projects' },
                { label: 'Experience', id: 'experience' },
                { label: 'Publications', id: 'publications' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-white hover:text-gray-400 transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen w-full flex items-center justify-center relative z-10 px-6"
      >
        <div className="max-w-4xl mx-auto text-center animate-slide-down">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 animate-glow">
            Hello, I'm Sayan
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            A passionate developer and creator exploring the intersection of design, technology, 
            and innovation. Building cool things on the web.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => scrollToSection('about')}
              className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Explore My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>
          <div className="mt-12 flex gap-6 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:your@email.com"
              className="text-gray-400 hover:text-white transition"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full flex items-center justify-center relative z-10 px-6 bg-gradient-to-b from-black to-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 flex items-center gap-3">
            <User size={40} />
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-gray-300 space-y-6">
              <p className="text-lg leading-relaxed">
                I'm a developer passionate about creating beautiful, functional digital experiences. 
                With a background in full-stack development and a keen eye for design, I love building 
                products that make an impact.
              </p>
              <p className="text-lg leading-relaxed">
                Currently exploring AI/ML applications and their intersection with user experience. 
                When I'm not coding, you can find me contributing to open-source projects or exploring 
                new design patterns.
              </p>
              <p className="text-lg leading-relaxed">
                I'm always interested in collaborating on exciting projects and pushing the boundaries 
                of what's possible on the web.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'React', 'Next.js', 'TypeScript', 'Python',
                    'Tailwind CSS', 'Node.js', 'AI/ML', 'Design'
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-400 mb-2">Fun fact</p>
                <p className="text-white">
                  I believe in building not just functional, but delightful products that users actually 
                  enjoy using.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen w-full flex items-center justify-center relative z-10 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 flex items-center gap-3">
            <Code2 size={40} />
            Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 hover:bg-white/10 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 bg-white/10 text-gray-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition"
                      >
                        <Github size={20} />
                        Code
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition"
                      >
                        <ExternalLink size={20} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-xl text-center">
            <p className="text-gray-400">More projects coming soon as I continue building...</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen w-full flex items-center justify-center relative z-10 px-6 bg-gradient-to-b from-black to-gray-900/20">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 flex items-center gap-3">
            <Briefcase size={40} />
            Experience
          </h2>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 border-l-2 border-white/20 hover:border-white/50 transition-colors duration-300"
              >
                <div className="absolute -left-4 top-0 w-6 h-6 bg-white rounded-full border-4 border-black" />
                
                <div className="text-lg font-semibold text-white mb-1">{exp.role}</div>
                <div className="text-gray-400 font-medium mb-2">{exp.company}</div>
                <div className="text-sm text-gray-500 mb-4">{exp.period}</div>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-gray-400">Currently open to exciting opportunities and collaborations</p>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="min-h-screen w-full flex items-center justify-center relative z-10 px-6">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 flex items-center gap-3">
            <FileText size={40} />
            Publications
          </h2>

          <div className="space-y-8">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="bg-gradient-to-r from-white/5 to-white/0 border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 group cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-300 transition">
                  {pub.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{pub.authors.join(', ')}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span>{pub.venue}</span>
                  <span>•</span>
                  <span>{pub.date}</span>
                  {pub.doi && (
                    <>
                      <span>•</span>
                      <span>{pub.doi}</span>
                    </>
                  )}
                </div>

                {pub.link && (
                  <a
                    href={pub.link}
                    className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    Read More
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-xl text-center">
            <p className="text-gray-400">Research papers and publications will be featured here</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen w-full flex items-center justify-center relative z-10 px-6 bg-gradient-to-b from-black to-gray-900/20">
        <div className="max-w-3xl mx-auto text-center w-full">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Let's Build Something Together</h2>
          <p className="text-xl text-gray-400 mb-12">
            I'm always interested in hearing about new projects and opportunities. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
            >
              <Github size={40} className="mx-auto mb-4 text-gray-400 group-hover:text-white transition" />
              <h3 className="font-semibold text-white mb-2">GitHub</h3>
              <p className="text-gray-400 text-sm">Check out my code</p>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
            >
              <Linkedin size={40} className="mx-auto mb-4 text-gray-400 group-hover:text-white transition" />
              <h3 className="font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-gray-400 text-sm">Connect with me</p>
            </a>

            <a
              href="mailto:your@email.com"
              className="p-8 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
            >
              <Mail size={40} className="mx-auto mb-4 text-gray-400 group-hover:text-white transition" />
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-400 text-sm">Send me a message</p>
            </a>
          </div>

          <div className="p-8 bg-gradient-to-r from-white/5 to-white/0 border border-white/10 rounded-xl">
            <p className="text-gray-400 mb-4">Or fill out the form below:</p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition resize-none"
              />
              <button
                type="submit"
                className="w-full px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/80 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2024 Sayan. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}


