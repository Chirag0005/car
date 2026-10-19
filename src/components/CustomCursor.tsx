import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, input, select, textarea, [role="button"], .interactive-target');
        setIsPointer(isClickable);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  // Smooth trailing effect
  useEffect(() => {
    let animationFrameId: number;
    const follow = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };
    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Precision inner dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F172A] transition-transform duration-75 shadow-sm"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '6px' : '4px',
          height: isPointer ? '6px' : '4px',
        }}
      />

      {/* Outer fluid halo ring */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out"
        style={{
          left: `${trailing.x}px`,
          top: `${trailing.y}px`,
          width: isPointer ? '44px' : '26px',
          height: isPointer ? '44px' : '26px',
          backgroundColor: isPointer ? 'rgba(198, 255, 61, 0.25)' : 'transparent',
          borderColor: isPointer ? '#65A30D' : 'rgba(15, 23, 42, 0.3)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};
