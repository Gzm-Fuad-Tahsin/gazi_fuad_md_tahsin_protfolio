// import { useRef, useEffect, useState } from 'react';

// const SKILLS = [
//   // Orbit 1 (Inner - Core Stack)
//   { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', orbit: 150, speed: 0.4, angleOffset: 0, color: '#61dafb' },
//   { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', orbit: 150, speed: 0.4, angleOffset: 2, color: '#68a063' },
//   { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', orbit: 150, speed: 0.4, angleOffset: 4, color: '#ffffff' },
//   { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', orbit: 150, speed: 0.4, angleOffset: 5.5, color: '#47a248' },
  
//   // Orbit 2 (Middle - Languages)
//   { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', orbit: 280, speed: 0.25, angleOffset: 0.5, color: '#f7df1e' },
//   { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', orbit: 280, speed: 0.25, angleOffset: 2.5, color: '#f89820' },
//   { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', orbit: 280, speed: 0.25, angleOffset: 4, color: '#3776ab' },
//   { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', orbit: 280, speed: 0.25, angleOffset: 5.5, color: '#00599c' },
//   { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', orbit: 280, speed: 0.25, angleOffset: 1.2, color: '#a8b9cc' },
//   { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', orbit: 280, speed: 0.25, angleOffset: 3.2, color: '#777bb4' },

//   // Orbit 3 (Outer - Tools & DBs)
//   { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', orbit: 400, speed: 0.15, angleOffset: 1, color: '#38bdf8' },
//   { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', orbit: 400, speed: 0.15, angleOffset: 3, color: '#00758f' },
//   { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', orbit: 400, speed: 0.15, angleOffset: 5, color: '#f05032' },
// ];

// export default function GalaxyCanvas() {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const [hoveredSkill, setHoveredSkill] = useState(null);
//   const [positions, setPositions] = useState([]);
//   const [draggingSkill, setDraggingSkill] = useState(null);
//   const mouseRef = useRef({ x: 0, y: 0 });
//   const WRef = useRef(0);
//   const HRef = useRef(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let animationId;
//     let time = 0;
//     let backgroundStars = [];

//     const resize = () => {
//       WRef.current = canvas.width = canvas.parentElement.clientWidth;
//       HRef.current = canvas.height = canvas.parentElement.clientHeight;
//       initStars();
//     };

//     const initStars = () => {
//       backgroundStars = Array.from({ length: 300 }, () => ({
//         x: Math.random() * WRef.current,
//         y: Math.random() * HRef.current,
//         size: Math.random() * 1.2,
//         speed: Math.random() * 0.5,
//       }));
//     };

//     const animate = () => {
//       time += 0.01;
//       ctx.clearRect(0, 0, WRef.current, HRef.current);

//       // Background
//       ctx.fillStyle = '#020505';
//       ctx.fillRect(0, 0, WRef.current, HRef.current);
//       backgroundStars.forEach(star => {
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.sin(time + star.speed) * 0.3})`;
//         ctx.fill();
//       });

//       const cx = WRef.current / 2;
//       const cy = HRef.current / 2;
//       const mouseEffectX = (mouseRef.current.x - cx) * 0.02;
//       const mouseEffectY = (mouseRef.current.y - cy) * 0.02;

//       // Sun
//       const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
//       sunGrad.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
//       sunGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.1)');
//       sunGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
//       ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fillStyle = sunGrad; ctx.fill();
//       ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fillStyle = '#34d399'; ctx.fill();

//       // Draw Orbits
//       [150, 280, 400].forEach(orbitRadius => {
//         ctx.beginPath();
//         ctx.ellipse(cx + mouseEffectX, cy + mouseEffectY, orbitRadius, orbitRadius * 0.4, 0, 0, Math.PI * 2);
//         ctx.strokeStyle = 'rgba(255,255,255,0.07)';
//         ctx.lineWidth = 1;
//         ctx.stroke();
//       });

//       // Calculate positions
//       const newPositions = SKILLS.map(skill => {
//         if (draggingSkill && draggingSkill.name === skill.name) {
//           // During drag, use current x/y
//           const existing = positions.find(p => p.name === skill.name);
//           return existing || skill;
//         } else {
//           const currentAngle = time * skill.speed + skill.angleOffset;
//           const tiltFactor = 0.4;
//           const x = cx + Math.cos(currentAngle) * skill.orbit + mouseEffectX;
//           const y = cy + Math.sin(currentAngle) * (skill.orbit * tiltFactor) + mouseEffectY;
//           return { ...skill, x, y, scale: 1 - Math.sin(currentAngle) * 0.3, z: Math.sin(currentAngle) };
//         }
//       });

//       // Sort by Z index for proper layering
//       newPositions.sort((a, b) => (a.z || 0) - (b.z || 0));
//       setPositions(newPositions);

//       animationId = requestAnimationFrame(animate);
//     };

//     const handleMouseMove = (e) => {
//       const rect = canvas.getBoundingClientRect();
//       mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

//       // Hover detection
//       let found = null;
//       positions.forEach(p => {
//         const dx = mouseRef.current.x - p.x;
//         const dy = mouseRef.current.y - p.y;
//         if (Math.sqrt(dx * dx + dy * dy) < 25) found = p;
//       });
//       setHoveredSkill(found);
//     };

//     resize();
//     animate();
//     window.addEventListener('resize', resize);
//     canvas.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener('resize', resize);
//       canvas.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [draggingSkill]);

//   // Drag Handlers
//   const handleMouseDown = (e, skill) => {
//     setDraggingSkill(skill);
//   };

//   const handleMouseUp = () => setDraggingSkill(null);

//   const handleMouseMoveDrag = (e) => {
//     if (!draggingSkill) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     setPositions(prev => prev.map(p =>
//       p.name === draggingSkill.name ? { ...p, x, y, orbit: Math.sqrt((x - WRef.current / 2) ** 2 + ((y - HRef.current / 2) / 0.4) ** 2) } : p
//     ));
//   };

//   return (
//     <div
//       ref={containerRef}
//       style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', cursor: draggingSkill ? 'grabbing' : 'crosshair' }}
//       onMouseMove={handleMouseMoveDrag}
//       onMouseUp={handleMouseUp}
//     >
//       <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

//       {/* Skill Icons */}
//       {positions.map((planet, idx) => (
//         <div
//           key={idx}
//           onMouseDown={(e) => handleMouseDown(e, planet)}
//           style={{
//             position: 'absolute',
//             left: planet.x - 20,
//             top: planet.y - 20,
//             width: '40px',
//             height: '40px',
//             borderRadius: '50%',
//             background: 'rgba(0,0,0,0.6)',
//             border: `2px solid ${planet.color}40`,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             transform: `scale(${planet.scale})`,
//             zIndex: Math.floor((planet.scale || 1) * 10),
//             opacity: 0.5 + (planet.scale || 0.5) * 0.5,
//             transition: 'border-color 0.2s, transform 0.1s',
//             boxShadow: hoveredSkill?.name === planet.name ? `0 0 15px ${planet.color}` : 'none',
//           }}
//         >
//           <img src={planet.icon} alt={planet.name} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
//         </div>
//       ))}

//       {/* Overlay */}
//       <div className="galaxy-overlay">
//         <div className="galaxy-label">Interactive Tech Universe</div>
//         <div className="galaxy-title">Skills Galaxy<span className="dot">.</span></div>
//         <div className="galaxy-subtitle">Move mouse to rotate. Hover or drag planets.</div>
//         {hoveredSkill && (
//           <div className="galaxy-tooltip" style={{ borderColor: hoveredSkill.color }}>
//             <span style={{ color: hoveredSkill.color }}>{hoveredSkill.name}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useRef, useEffect, useState } from "react";

const SKILLS = [
  // Inner orbit
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    orbit: 150,
    speed: 0.001,
    angleOffset: 0,
    color: "#61dafb",
    description: "UI Library for building interactive interfaces.",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    orbit: 150,
    speed: 0.002,
    angleOffset: 2,
    color: "#68a063",
    description: "Server-side runtime environment.",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    orbit: 150,
    speed: 0.003,
    angleOffset: 4,
    color: "#ffffff",
    description: "Web framework for Node.js.",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    orbit: 150,
    speed: 0.004,
    angleOffset: 5.5,
    color: "#47a248",
    description: "NoSQL database.",
  },

  // Middle orbit
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    orbit: 280,
    speed: 0.0012,
    angleOffset: 0.5,
    color: "#f7df1e",
    description: "Programming language for web.",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    orbit: 280,
    speed: 0.0013,
    angleOffset: 2.5,
    color: "#f89820",
    description: "General-purpose programming language.",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    orbit: 280,
    speed: 0.0014,
    angleOffset: 4,
    color: "#3776ab",
    description: "High-level programming language.",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    orbit: 280,
    speed: 0.0015,
    angleOffset: 5.5,
    color: "#00599c",
    description: "High-performance programming language.",
  },

  // Outer orbit
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    orbit: 400,
    speed: 0.0006,
    angleOffset: 1,
    color: "#38bdf8",
    description: "CSS framework.",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    orbit: 400,
    speed: 0.0007,
    angleOffset: 3,
    color: "#00758f",
    description: "Relational database.",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    orbit: 400,
    speed: 0.0008,
    angleOffset: 5,
    color: "#f05032",
    description: "Version control system.",
  },
];

// Background fake systems
const FAKE_SYSTEMS = Array.from({ length: 6 }, () => ({
  x: Math.random() * 1600 - 800,
  y: Math.random() * 900 - 450,
  orbit: 20 + Math.random() * 25,
  speed: 0.0005 + Math.random() * 0.001,
  planetCount: 3 + Math.floor(Math.random() * 4),
}));

export default function GalaxyCanvas() {
  const canvasRef = useRef(null);
  const WRef = useRef(0);
  const HRef = useRef(0);
  const planetAnglesRef = useRef(SKILLS.map(() => Math.random() * Math.PI * 2));
  const [pausedSkill, setPausedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const imagesRef = useRef({}); // To store loaded logo images

  // Preload all tech icons
  useEffect(() => {
    SKILLS.forEach((skill) => {
      if (!imagesRef.current[skill.name]) {
        const img = new Image();
        img.src = skill.icon;
        img.crossOrigin = "anonymous"; // Helps with canvas rendering
        imagesRef.current[skill.name] = img;
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      WRef.current = canvas.width = canvas.parentElement.clientWidth;
      HRef.current = canvas.height = canvas.parentElement.clientHeight;
    };

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * WRef.current,
      y: Math.random() * HRef.current,
      r: Math.random() * 1.2,
      a: 0.2 + Math.random() * 0.8,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, WRef.current, HRef.current);
      const cx = WRef.current / 2;
      const cy = HRef.current / 2 + 50;

      // Stars (Warm emerald tint)
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 240, ${star.a * 0.5})`;
        ctx.fill();
      });

      // Background fake systems (Emerald dust)
      FAKE_SYSTEMS.forEach((sys, sysIndex) => {
        for (let i = 0; i < sys.planetCount; i++) {
          const angle =
            planetAnglesRef.current[i % SKILLS.length] +
            i * (Math.PI * 2 / sys.planetCount) +
            sysIndex;
          const x = cx + sys.x + Math.cos(angle) * sys.orbit;
          const y = cy + sys.y + Math.sin(angle) * sys.orbit * 0.6;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
          ctx.fill();
        }
      });

      // Sun glow (Your Accent Color)
      const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      sunGrad.addColorStop(0, "#10b981");
      sunGrad.addColorStop(0.3, "rgba(16,185,129,0.4)");
      sunGrad.addColorStop(1, "rgba(16,185,129,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Sun core
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#34d399";
      ctx.fill();

      // Main planets
      SKILLS.forEach((planet, i) => {
        const angles = planetAnglesRef.current;
        const speed = pausedSkill?.name === planet.name ? 0 : planet.speed;
        angles[i] += speed;

        const x = cx + Math.cos(angles[i]) * planet.orbit;
        const y = cy + Math.sin(angles[i]) * planet.orbit * 0.4;
        const scale = pausedSkill?.name === planet.name ? 1.5 : 1 - Math.sin(angles[i]) * 0.2;
        const isHovered = hoveredSkill?.name === planet.name;

        planet.screenX = x;
        planet.screenY = y;
        planet.currentScale = scale;

        // Orbit ring (Emerald tint)
        ctx.beginPath();
        ctx.ellipse(cx, cy, planet.orbit, planet.orbit * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.06)";
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Planet Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 30 * scale);
        glow.addColorStop(0, planet.color + (isHovered ? "cc" : "80"));
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(x, y, 30 * scale, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Planet Body Background (Dark Emerald for logos to sit on)
        ctx.beginPath();
        ctx.arc(x, y, 18 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "#050a08"; 
        ctx.fill();
        ctx.strokeStyle = planet.color + "aa";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Logo Image
        const img = imagesRef.current[planet.name];
        if (img && img.complete) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, 14 * scale, 0, Math.PI * 2);
          ctx.clip(); // Clip so logo doesn't bleed outside circle
          const imgSize = 24 * scale;
          ctx.drawImage(img, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
          ctx.restore();
        }

        // Planet label
        ctx.fillStyle = isHovered ? "#fff" : "rgba(255,255,255,0.6)";
        ctx.font = `${isHovered ? '600' : '400'} 12px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(planet.name, x, y + 30 * scale);
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [pausedSkill, hoveredSkill]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    let found = null;

    for (let planet of SKILLS) {
      const dx = mouseX - planet.screenX;
      const dy = mouseY - planet.screenY;
      const radius = 20 * (planet.currentScale || 1);
      if (Math.sqrt(dx * dx + dy * dy) < radius) {
        found = planet;
        break;
      }
    }
    setHoveredSkill(found);
    canvasRef.current.style.cursor = found ? "pointer" : "default";
  };

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let planet of SKILLS) {
      const dx = clickX - planet.screenX;
      const dy = clickY - planet.screenY;
      const radius = 20 * (planet.currentScale || 1);

      if (Math.sqrt(dx * dx + dy * dy) < radius) {
        setPausedSkill(planet);
        setTimeout(() => setPausedSkill(null), 3500);
        break;
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        // Your exact Galaxy background theme
        background: "radial-gradient(ellipse at center, #0a1410 0%, #020505 70%)",
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Header - matching your global class styles */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          width: "100%",
          textAlign: "center",
          color: "white",
          pointerEvents: "none",
          zIndex: 10
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#10b981", // Accent color
            opacity: 0.8,
            marginBottom: "8px"
          }}
        >
          Interactive Tech Universe
        </div>

        <div
          style={{
            fontSize: "clamp(32px, 6vw, 64px)",
            fontWeight: 800,
            color: "#fff",
            textShadow: "0 0 60px rgba(16, 185, 129, 0.3)",
            letterSpacing: "-1px"
          }}
        >
          Skills Galaxy<span style={{color: "#10b981"}}>.</span>
        </div>

        <div
          style={{
            fontSize: "16px",
            marginTop: "10px",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 300
          }}
        >
          Click planets to explore skills
        </div>
      </div>

      {/* Skill popup - matching your glass morphism theme */}
      {pausedSkill && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(5, 10, 8, 0.85)", // Card background
            border: `1px solid ${pausedSkill.color}55`,
            padding: "16px 22px",
            borderRadius: "14px",
            color: "white",
            maxWidth: "420px",
            textAlign: "center",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: `0 0 30px ${pausedSkill.color}22`,
            zIndex: 20
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: pausedSkill.color,
              marginBottom: "8px",
            }}
          >
            {pausedSkill.name}
          </div>

          <div
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#94a3b8", // Secondary text color
              fontWeight: 300
            }}
          >
            {pausedSkill.description}
          </div>
        </div>
      )}
    </div>
  );
}