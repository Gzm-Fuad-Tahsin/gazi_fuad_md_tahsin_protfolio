import { useRef, useEffect } from 'react';
import './Hero.css';

export default function Hero() {
  const starsRef = useRef(null);

  useEffect(() => {
    const canvas = starsRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, animationId, time = 0;
    let stars = [];

    function resize() {
      // Force exact window dimensions for fullscreen
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      stars = Array.from({length: 150}, () => ({
        x: Math.random() * W, y: Math.random() * H, 
        size: Math.random() * 1.5 + 0.5, speed: Math.random() * 0.5
      }));
    }

    function animate() {
      time += 0.01;
      ctx.clearRect(0, 0, W, H);
      stars.forEach(star => {
        ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 240, ${0.3 + Math.sin(time + star.speed) * 0.4})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    }

    resize(); animate();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg"></div>
      <canvas ref={starsRef} className="hero-canvas"></canvas>
      <div className="hero-content">
        <div className="hero-badge">✨ Available for Opportunities</div>
        <h1 className="hero-title">Gazi Fuad<br />Md. Tahsin</h1>
        <p className="hero-subtitle"><strong>Software Engineer</strong> & <strong>Full Stack Developer</strong> crafting robust, scalable systems and seamless user experiences.</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View Projects →</a>
          <a href="#nature" className="btn-secondary">🌲 Explore Nature</a>
        </div>
      </div>
      <div className="hero-scroll"><span>Scroll</span>↓</div>
    </section>
  );
}