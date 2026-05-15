import { useRef, useEffect, useState } from 'react';

export default function NatureCanvas() {
  const canvasRef = useRef(null);
  const [treeCount, setTreeCount] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, groundY, animationId, time = 0;
    let trees = [], fireflies = [], grassBlades = [], ripples = [];
    let mouse = { x: -1000, y: -1000 };

    // --- OFFSCREEN CACHING FOR PERFORMANCE ---
    const fireflyGlowCanvas = document.createElement('canvas');
    const fireflyGlowCtx = fireflyGlowCanvas.getContext('2d');
    const fireflyGlowSize = 64;
    fireflyGlowCanvas.width = fireflyGlowSize;
    fireflyGlowCanvas.height = fireflyGlowSize;
    
    function cacheFireflyGlow() {
      const half = fireflyGlowSize / 2;
      const grad = fireflyGlowCtx.createRadialGradient(half, half, 0, half, half, half);
      grad.addColorStop(0, 'rgba(16,185,129,0.4)');
      grad.addColorStop(0.3, 'rgba(16,185,129,0.15)');
      grad.addColorStop(1, 'rgba(16,185,129,0)');
      fireflyGlowCtx.fillStyle = grad;
      fireflyGlowCtx.fillRect(0, 0, fireflyGlowSize, fireflyGlowSize);
    }
    cacheFireflyGlow();

    function resize() {
      W = canvas.width = canvas.parentElement.clientWidth;
      H = canvas.height = canvas.parentElement.clientHeight;
      groundY = H * 0.72;
      initGrass();
    }

    function initGrass() { 
      grassBlades = Array.from({length: 200}, () => ({ 
        x: Math.random()*W, height: 8+Math.random()*25, width: 1+Math.random()*2, 
        swayOffset: Math.random()*Math.PI*2, swaySpeed: 0.01+Math.random()*0.02, 
        color: `rgba(${15+Math.random()*30}, ${60+Math.random()*60}, ${25+Math.random()*30}, ${0.4+Math.random()*0.4})` 
      })); 
    }

    class Tree { /* same as your current Tree class */ 
      constructor(x, y, size) { this.x = x; this.y = y; this.size = size; this.growth = 0; this.growthSpeed = 0.008+Math.random()*0.004; this.segments = []; this.seed = Math.random()*10000; this.generate(this.x, this.y, -Math.PI/2, this.size, 0); }
      random() { this.seed = (this.seed*9301+49297)%233280; return this.seed/233280; }
      generate(x, y, angle, length, depth) {
        if (depth > 9 || length < 3) return;
        const endX = x+Math.cos(angle)*length, endY = y+Math.sin(angle)*length;
        this.segments.push({ x1:x, y1:y, x2:endX, y2:endY, depth, width: Math.max(1,(10-depth)*1.6), isLeaf: depth>=7, leafSize: 3+this.random()*6, leafAlpha: 0.12+this.random()*0.2 });
        const shrink = 0.65+this.random()*0.1, spread = 0.25+this.random()*0.35;
        this.generate(endX, endY, angle-spread, length*shrink, depth+1);
        this.generate(endX, endY, angle+spread, length*shrink, depth+1);
        if (this.random() > 0.55 && depth < 6) this.generate(endX, endY, angle+(this.random()-0.5)*0.5, length*shrink*0.85, depth+1);
      }
      update() { if (this.growth < 1) this.growth = Math.min(1, this.growth + this.growthSpeed); }
      draw() {
        const totalSegs = this.segments.length, visibleCount = Math.floor(totalSegs * this.growth);
        for (let i = 0; i < visibleCount; i++) {
          const seg = this.segments[i], localProgress = i < visibleCount - 1 ? 1 : Math.min(1, (this.growth*totalSegs - Math.floor(this.growth*totalSegs))*2);
          const ex = seg.x1+(seg.x2-seg.x1)*localProgress, ey = seg.y1+(seg.y2-seg.y1)*localProgress;
          ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(ex, ey);
          ctx.lineWidth = seg.width; ctx.strokeStyle = seg.depth < 3 ? '#0d1a10' : '#0a150c'; ctx.lineCap = 'round'; ctx.stroke();
          if (seg.isLeaf && localProgress > 0.5) {
            const windOffset = Math.sin(time*0.01+seg.x2*0.01)*1.5;
            ctx.beginPath(); ctx.arc(ex+windOffset, ey, seg.leafSize, 0, Math.PI*2);
            ctx.fillStyle = `rgba(16, 185, 129, ${seg.leafAlpha})`; ctx.fill();
          }
        }
      }
    }

    class Firefly { /* same as your Firefly class */ 
      constructor() { this.reset(); }
      reset() { this.x = Math.random()*W; this.y = groundY-Math.random()*(groundY*0.55); this.vx = (Math.random()-0.5)*0.4; this.vy = (Math.random()-0.5)*0.3; this.size = 1.5+Math.random()*2; this.brightness = 0.3+Math.random()*0.7; this.brightnessSpeed = 0.008+Math.random()*0.025; this.brightnessDir = Math.random()>0.5?1:-1; }
      update() {
        this.vx += (Math.random()-0.5)*0.04; this.vy += (Math.random()-0.5)*0.04;
        const dx = mouse.x-this.x, dy = mouse.y-this.y, dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 180 && dist > 5) { const force = 0.025*(1-dist/180); this.vx += (dx/dist)*force; this.vy += (dy/dist)*force; }
        this.vx *= 0.985; this.vy *= 0.985; this.x += this.vx; this.y += this.vy;
        if (this.x < -20) this.x = W+20; if (this.x > W+20) this.x = -20;
        if (this.y < groundY*0.1) this.vy += 0.02; if (this.y > groundY-10) this.vy -= 0.02;
        this.brightness += this.brightnessSpeed*this.brightnessDir;
        if (this.brightness > 1) { this.brightness = 1; this.brightnessDir = -1; } if (this.brightness < 0.15) { this.brightness = 0.15; this.brightnessDir = 1; }
      }
      draw() {
        const b = this.brightness;
        const glowRadius = this.size * (6 + b * 4);
        ctx.globalAlpha = b;
        ctx.drawImage(fireflyGlowCanvas, this.x - glowRadius, this.y - glowRadius, glowRadius * 2, glowRadius * 2);
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size*(0.5+b*0.5), 0, Math.PI*2); 
        ctx.fillStyle=`rgba(200,255,220,${b*0.9})`; ctx.fill();
      }
    }

    class Ripple { constructor(x,y) { this.x=x; this.y=y; this.radius=0; this.maxRadius=60+Math.random()*40; this.alpha=0.5; } update() { this.radius+=1.5; this.alpha=0.5*(1-this.radius/this.maxRadius); return this.radius<this.maxRadius; } draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.radius,0,Math.PI*2); ctx.strokeStyle=`rgba(16,185,129,${this.alpha})`; ctx.lineWidth=1.5; ctx.stroke(); } }

    function init() {
      trees = [new Tree(W*0.12, groundY, 70+Math.random()*30), new Tree(W*0.35, groundY, 90+Math.random()*30), new Tree(W*0.65, groundY, 80+Math.random()*30), new Tree(W*0.88, groundY, 60+Math.random()*30)];
      fireflies = Array.from({length: 60}, () => new Firefly());
    }

    function animate() {
      time++; ctx.clearRect(0,0,W,H);

      // Sky
      const skyGrad = ctx.createLinearGradient(0,0,0,groundY); 
      skyGrad.addColorStop(0,'#050810'); skyGrad.addColorStop(0.4,'#0a1225'); skyGrad.addColorStop(0.7,'#0d1a20'); skyGrad.addColorStop(1,'#0f1f18'); 
      ctx.fillStyle=skyGrad; ctx.fillRect(0,0,W,groundY);

      // Moon
      const mx=W*0.8, my=H*0.15, mr=35;
      const moonGlow = ctx.createRadialGradient(mx,my,mr*0.5,mx,my,mr*6); 
      moonGlow.addColorStop(0,'rgba(255,250,220,0.12)'); moonGlow.addColorStop(0.5,'rgba(255,250,220,0.04)'); moonGlow.addColorStop(1,'rgba(255,250,220,0)'); 
      ctx.beginPath(); ctx.arc(mx,my,mr*6,0,Math.PI*2); ctx.fillStyle=moonGlow; ctx.fill();
      ctx.beginPath(); ctx.arc(mx,my,mr,0,Math.PI*2); ctx.fillStyle='rgba(255,250,225,0.9)'; ctx.fill();

      // Stars (reduced 100)
      for(let i=0; i<100; i++) {
        const alpha = 0.5 + 0.5 * Math.sin(time * 0.02 + i);
        ctx.beginPath(); ctx.arc(Math.sin(i*132.3)*W*0.5+W*0.5, Math.cos(i*445.2)*groundY*0.35+groundY*0.15, 0.5+Math.random(), 0, Math.PI*2); 
        ctx.fillStyle=`rgba(255,255,240,${alpha})`; ctx.fill();
      }

      // Trees
      trees.forEach(t => { t.update(); t.draw(ctx); });
      
      // Ground
      const groundGrad = ctx.createLinearGradient(0,groundY,0,H); 
      groundGrad.addColorStop(0,'#0a1a0f'); groundGrad.addColorStop(0.3,'#060f08'); groundGrad.addColorStop(1,'#030805'); 
      ctx.fillStyle=groundGrad; ctx.fillRect(0,groundY,W,H-groundY);

      // Grass
      grassBlades.forEach(g => { 
        const sway = Math.sin(time*g.swaySpeed+g.swayOffset)*4; 
        ctx.beginPath(); 
        ctx.moveTo(g.x,groundY); 
        ctx.quadraticCurveTo(g.x+sway*0.5,groundY-g.height*0.5,g.x+sway,groundY-g.height); 
        ctx.strokeStyle=g.color; 
        ctx.lineWidth=g.width; 
        ctx.lineCap='round'; 
        ctx.stroke(); 
      });

      // Ripples & Fireflies
      ripples = ripples.filter(r => { r.draw(); return r.update(); });
      fireflies.forEach(f => { f.update(); f.draw(); });

      animationId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e) => { const rect = canvas.getBoundingClientRect(); mouse.x = e.clientX-rect.left; mouse.y = e.clientY-rect.top; };
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect(), cx = e.clientX-rect.left, cy = e.clientY-rect.top;
      if (cy > groundY-40) { trees.push(new Tree(cx, groundY, 50+Math.random()*60)); setTreeCount(prev => prev+1); }
      ripples.push(new Ripple(cx, cy));
    };

    resize(); init(); animate();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); canvas.removeEventListener('mousemove', handleMouseMove); canvas.removeEventListener('mouseleave', handleMouseLeave); canvas.removeEventListener('click', handleClick); };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="nature-canvas" />
      <div className="nature-overlay">
        <div className="nature-label">Interactive Experience</div>
        <div className="nature-title">Explore<span className="dot">.</span> Simulate<span className="dot">.</span> Understand<span className="dot">.</span></div>
        <div className="nature-subtitle">An interactive nature simulation — watch life grow and follow the light</div>
        <div className="nature-instructions">
          <div className="nature-hint">🖱️ Click to plant a tree</div>
          <div className="nature-hint">✋ Move mouse to attract fireflies</div>
        </div>
      </div>
      <div className="nature-counter">Trees planted: <span>{treeCount}</span></div>
    </>
  );
}