import { useState, useEffect, useRef } from 'react';
import NatureCanvas from './components/NatureCanvas';
import GalaxyCanvas from './components/GalaxyCanvas';
import Hero from './components/Hero';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  // Scroll Reveal Logic
  const observeRef = useRef(null);
  useEffect(() => {
    observeRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observeRef.current.observe(el));
    return () => observeRef.current && observeRef.current.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastShow(true);
    setTimeout(() => setToastShow(false), 3000);
    e.target.reset();
  };

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#hero" className="nav-logo"><span>Gazi</span>Tahsin</a>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          {/* <li><a href="#nature">Explore</a></li> */}
          <li><a href="#galaxy">Galaxy</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
        <div className={`mobile-menu ${mobileOpen ? 'active' : ''}`}>
          <a href="#hero" onClick={() => setMobileOpen(false)}>Home</a>
          {/* <a href="#nature" onClick={() => setMobileOpen(false)}>Explore</a> */}
          <a href="#galaxy" onClick={() => setMobileOpen(false)}>Galaxy</a>
          <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMobileOpen(false)}>Skills</a>
          <a href="#experience" onClick={() => setMobileOpen(false)}>Experience</a>
          <a href="#projects" onClick={() => setMobileOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        {/* <div className="hero-bg"></div>
        <div className="hero-particles" id="heroParticles"></div>
        <div className="hero-content">
          <div className="hero-badge">✨ Available for Opportunities</div>
          <h1 className="hero-title">Gazi Fuad<br />Md. Tahsin</h1>
          <p className="hero-subtitle"><strong>Software Engineer</strong> & <strong>Full Stack Developer</strong> crafting robust, scalable systems and seamless user experiences.</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">View Projects →</a>
            <a href="#nature" className="btn-secondary">🌲 Explore Nature</a>
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll</span>↓</div> */}
        <Hero />
      </section>

      {/* NATURE SECTION */}
      {/* <section className="nature-section" id="nature">
        <NatureCanvas />
      </section> */}

      {/* ABOUT */}
      <section id="about" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-container">
          <div className="about-grid">
            <div className="about-image-wrap reveal">
              <img src="https://picsum.photos/seed/tahsin-dev-portrait/600/750.jpg" alt="Tahsin" />
              <div className="about-image-border"></div>
            </div>
            <div className="about-text">
              <div className="section-label reveal">About Me</div>
              <h3 className="reveal">Building digital experiences that <span>matter</span></h3>
              <p className="reveal">I'm a Full Stack Developer and Software Engineer from Narayanganj, Dhaka, Bangladesh. I specialize in designing robust, scalable systems and creating seamless user experiences.</p>
              <p className="reveal">With a B.Sc. in CSE and hands-on experience across e-commerce, trading platforms, real-time communication, and AI-integrated applications, I deliver end-to-end solutions that balance functionality and user satisfaction.</p>
              <p className="reveal">I thrive in both front-end and back-end development, ensuring secure, maintainable applications with optimized performance. From concept to deployment, I own the full development lifecycle.</p>
              <div className="about-stats reveal">
                <div className="stat-card"><span className="stat-number">3+</span><span className="stat-label">Years Exp</span></div>
                <div className="stat-card"><span className="stat-number">10+</span><span className="stat-label">Projects</span></div>
                <div className="stat-card"><span className="stat-number">3.66</span><span className="stat-label">CGPA</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* GALAXY SECTION */}
      <section className="galaxy-section" id="galaxy" style={{ background: '#020505' }}>
        <GalaxyCanvas />
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label reveal">Tech Stack</div>
            <h2 className="section-title reveal">Skills & Technologies</h2>
            <p className="section-desc reveal">A versatile toolkit spanning front-end, back-end, databases, and beyond.</p>
          </div>
          <div className="skills-grid">
            <div className="skill-card reveal reveal-delay-1">
              <div className="skill-icon">💻</div>
              <h4>Languages</h4>
              <div className="skill-tags"><span className="skill-tag">Java</span><span className="skill-tag">Python</span><span className="skill-tag">JavaScript</span><span className="skill-tag">C</span><span className="skill-tag">C++</span><span className="skill-tag">PHP</span></div>
            </div>
            <div className="skill-card reveal reveal-delay-2">
              <div className="skill-icon">🎨</div>
              <h4>Frontend</h4>
              <div className="skill-tags"><span className="skill-tag">React</span><span className="skill-tag">HTML5</span><span className="skill-tag">CSS3</span><span className="skill-tag">Tailwind CSS</span><span className="skill-tag">Framer Motion</span></div>
            </div>
            <div className="skill-card reveal reveal-delay-3">
              <div className="skill-icon">⚙️</div>
              <h4>Backend</h4>
              <div className="skill-tags"><span className="skill-tag">Node.js</span><span className="skill-tag">Express.js</span><span className="skill-tag">REST APIs</span><span className="skill-tag">OpenAI Integration</span><span className="skill-tag">JWT</span></div>
            </div>
            <div className="skill-card reveal reveal-delay-1">
              <div className="skill-icon">🗄️</div>
              <h4>Databases</h4>
              <div className="skill-tags"><span className="skill-tag">MongoDB</span><span className="skill-tag">MySQL</span></div>
            </div>
            <div className="skill-card reveal reveal-delay-2">
              <div className="skill-icon">🛠️</div>
              <h4>DevOps & Tools</h4>
              <div className="skill-tags"><span className="skill-tag">Git</span><span className="skill-tag">GitHub</span><span className="skill-tag">Stripe</span><span className="skill-tag">Node Mailer</span><span className="skill-tag">Axios</span></div>
            </div>
            <div className="skill-card reveal reveal-delay-3">
              <div className="skill-icon">🏆</div>
              <h4>Competitive Programming</h4>
              <div className="skill-tags"><span className="skill-tag">Codeforces</span><span className="skill-tag">CodeChef</span><span className="skill-tag">ICPC</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-container">
          <div className="section-header">
            <div className="section-label reveal">Career Path</div>
            <h2 className="section-title reveal">Work Experience</h2>
            <p className="section-desc reveal">A journey through diverse projects and growing responsibilities.</p>
          </div>
          <div className="timeline">
            <div className="timeline-item current reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-date">May 2025 — Present</div>
              <div className="timeline-company">SCALEUP Ads Agency</div>
              <div className="timeline-role">Backend Developer</div>
              <div className="timeline-projects">
                <div className="timeline-project"><strong>Bus Route App</strong> — Ticket booking & route management for public transport</div>
                <div className="timeline-project"><strong>Trading Platform</strong> — Real-time trading, portfolio tracking & financial analytics</div>
                <div className="timeline-project"><strong>Organic E-Commerce</strong> — Led backend & launched beta for sustainable marketplace</div>
                <div className="timeline-project"><strong>MP3 Library App</strong> — Secure audio streaming with playlists & subscriptions</div>
                <div className="timeline-project"><strong>Language Learning App</strong> — Story-based learning, speech synthesis & progress tracking</div>
                <div className="timeline-project"><strong>Auction App</strong> — Real-time bidding & item management APIs</div>
                <div className="timeline-project"><strong>Chat & Call App</strong> — Real-time chat infrastructure with voice calls</div>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Oct 2024 — Apr 2025</div>
              <div className="timeline-company">TS4U IT</div>
              <div className="timeline-role">Backend Developer</div>
              <div className="timeline-projects">
                <div className="timeline-project"><strong>E-commerce Platform</strong> — Implemented updates and improvements</div>
                <div className="timeline-project"><strong>Vocalize Pro</strong> — Managed entire backend, OpenAI integration & social media APIs</div>
                <div className="timeline-project"><strong>Orbit Task</strong> — Led backend development & successfully launched beta</div>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Jun 2023 — Feb 2024</div>
              <div className="timeline-company">GogoshopBD</div>
              <div className="timeline-role">Full Stack Developer (MERN)</div>
              <div className="timeline-projects">
                <div className="timeline-project"><strong>E-commerce Platform</strong> — Developed features, optimized queries & improved API performance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label reveal">Featured Work</div>
            <h2 className="section-title reveal">Key Projects</h2>
            <p className="section-desc reveal">Highlights from academic and personal projects.</p>
          </div>
          <div className="projects-grid">
            <div className="project-card reveal">
              <img className="project-image" src="https://picsum.photos/seed/restaurant-pos-system/800/450.jpg" alt="Restaurant System" />
              <div className="project-body">
                <div className="project-type">Capstone Project</div>
                <div className="project-name">Multi-vendor Restaurant Management System</div>
                <div className="project-desc">Revolutionizing the restaurant industry with integrated POS, account management, and e-restaurant platform. Streamlined operations, efficient order management, and expanded reach for restaurant owners.</div>
                <div className="project-tech"><span className="project-tech-tag">React</span><span className="project-tech-tag">Node.js</span><span className="project-tech-tag">MongoDB</span><span className="project-tech-tag">Express</span><span className="project-tech-tag">Stripe</span><span className="project-tech-tag">JWT</span><span className="project-tech-tag">Framer Motion</span></div>
                <a href="#" className="project-link">View on GitHub ↗</a>
              </div>
            </div>
            <div className="project-card reveal reveal-delay-2">
              <img className="project-image" src="https://picsum.photos/seed/encryption-security/800/450.jpg" alt="Krypton" />
              <div className="project-body">
                <div className="project-type">Security Application</div>
                <div className="project-name">Krypton — AES Encryption Software</div>
                <div className="project-desc">Java-based encryption software providing strong AES encryption with user-friendly features, secure data handling, cross-platform compatibility, and compliance with data protection regulations.</div>
                <div className="project-tech"><span className="project-tech-tag">Java</span><span className="project-tech-tag">AES Encryption</span><span className="project-tech-tag">JWT</span></div>
                <a href="#" className="project-link">View on GitHub ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION & AWARDS */}
      <section id="education" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-container">
          <div className="section-header">
            <div className="section-label reveal">Background</div>
            <h2 className="section-title reveal">Education & Achievements</h2>
          </div>
          <div className="edu-awards-grid">
            <div className="ea-card reveal">
              <div className="ea-card-icon">🎓</div>
              <h4>B.Sc. in Computer Science & Engineering</h4>
              <div className="ea-sub">R P Shaha University • 2024 • CGPA: 3.66 / 4.00</div>
              <p>Completed undergraduate studies in CSE with a strong focus on software engineering, data structures, algorithms, and system design. Achieved academic excellence with consistent high performance throughout the program.</p>
            </div>
            <div className="ea-card reveal reveal-delay-2">
              <div className="ea-card-icon">🏅</div>
              <h4>Honors & Awards</h4>
              <div className="ea-sub">Competitive Programming & Academics</div>
              <div className="award-item">
                <div className="award-icon">🏆</div>
                <div className="award-text"><strong>ICPC Asia Dhaka Regional 2021</strong> — Participated in the prestigious ICPC Asia Dhaka Regional Contest</div>
              </div>
              <div className="award-item">
                <div className="award-icon">🥈</div>
                <div className="award-text"><strong>University Programming Competition</strong> — Achieved Runner-up position</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label reveal">Get in Touch</div>
            <h2 className="section-title reveal">Let's Work Together</h2>
            <p className="section-desc reveal">Have a project in mind? I'd love to hear about it.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3 className="reveal">Let's build something <span>amazing</span></h3>
              <p className="reveal">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out.</p>
              <div className="contact-links">
                <a href="mailto:gazitahsin323@gmail.com" className="contact-link reveal">
                  <div className="contact-link-icon">✉️</div>
                  <div className="contact-link-text"><div className="clt-label">Email</div><div className="clt-value">gazitahsin323@gmail.com</div></div>
                </a>
                <a href="tel:+8801537399940" className="contact-link reveal">
                  <div className="contact-link-icon">📱</div>
                  <div className="contact-link-text"><div className="clt-label">Phone</div><div className="clt-value">+880 1537399940</div></div>
                </a>
                <a href="#" className="contact-link reveal">
                  <div className="contact-link-icon">💼</div>
                  <div className="contact-link-text"><div className="clt-label">LinkedIn</div><div className="clt-value">Gazi Fuad Md. Tahsin</div></div>
                </a>
                <a href="#" className="contact-link reveal">
                  <div className="contact-link-icon">🐙</div>
                  <div className="contact-link-text"><div className="clt-label">GitHub</div><div className="clt-value">View Repositories</div></div>
                </a>
                <div className="contact-link reveal">
                  <div className="contact-link-icon">📍</div>
                  <div className="contact-link-text"><div className="clt-label">Location</div><div className="clt-value">Narayanganj, Dhaka, Bangladesh</div></div>
                </div>
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label htmlFor="name">Name</label><input type="text" id="name" placeholder="Your name" required /></div>
                <div className="form-group"><label htmlFor="email">Email</label><input type="email" id="email" placeholder="you@example.com" required /></div>
              </div>
              <div className="form-group"><label htmlFor="subject">Subject</label><input type="text" id="subject" placeholder="Project discussion" /></div>
              <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" placeholder="Tell me about your project..." required></textarea></div>
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message ➤</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-socials">
          <a href="#" className="footer-social">💼</a>
          <a href="#" className="footer-social">🐙</a>
          <a href="mailto:gazitahsin323@gmail.com" className="footer-social">✉️</a>
        </div>
        <p className="footer-text">© 2025 Gazi Fuad Md. Tahsin. Crafted with passion and code.</p>
      </footer>

      {/* TOAST */}
      <div className={`toast ${toastShow ? 'show' : ''}`}>Message sent successfully!</div>
    </>
  );
}

export default App;