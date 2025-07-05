
import React, { useEffect, useRef } from 'react';

const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const shapes = container.querySelectorAll('.floating-shape');
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      shapes.forEach((shape, index) => {
        const element = shape as HTMLElement;
        const speed = (index + 1) * 0.0005;
        const x = (clientX - centerX) * speed;
        const y = (clientY - centerY) * speed;
        
        element.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large floating circle */}
      <div className="floating-shape absolute w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-sm animate-pulse top-20 left-20" 
           style={{ animationDelay: '0s', animationDuration: '4s' }} />
      
      {/* Medium triangle */}
      <div className="floating-shape absolute w-24 h-24 top-40 right-32 animate-pulse"
           style={{ animationDelay: '1s', animationDuration: '3s' }}>
        <div className="w-full h-full bg-gradient-to-br from-lavender-200/20 to-blue-200/20 transform rotate-45 blur-sm" />
      </div>
      
      {/* Small hexagon */}
      <div className="floating-shape absolute w-16 h-16 bottom-32 left-1/4 animate-pulse"
           style={{ animationDelay: '2s', animationDuration: '5s' }}>
        <div className="w-full h-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 transform rotate-12 blur-sm" 
             style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
      </div>
      
      {/* Diamond shape */}
      <div className="floating-shape absolute w-20 h-20 top-1/2 right-20 animate-pulse"
           style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
        <div className="w-full h-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 transform rotate-45 blur-sm" />
      </div>
      
      {/* Floating ellipse */}
      <div className="floating-shape absolute w-28 h-16 bottom-20 right-1/3 bg-gradient-to-r from-lavender-200/20 to-blue-200/20 rounded-full blur-sm animate-pulse"
           style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
    </div>
  );
};

export default FloatingShapes;
