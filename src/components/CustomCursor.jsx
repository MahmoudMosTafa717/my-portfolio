import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor
 * - Small dot: snaps to mouse instantly
 * - Outer ring: lags with lerp for a smooth trailing feel
 * - Hover state: ring expands + fills with brand gradient
 * - Hidden on touch / mobile devices
 */
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices — no custom cursor needed
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const LERP = 0.12; // lower = more lag (smoother), higher = snappier

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);
    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    // Detect interactive elements
    const onMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, [tabindex]'
      );
      setHovered(!!target);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    // Animation loop for the lagging ring
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (isTouchDevice) return null;

  const isVisible = !hidden;

  return (
    <>
      {/* Outer ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: hovered ? '48px' : clicking ? '28px' : '36px',
            height: hovered ? '48px' : clicking ? '28px' : '36px',
            borderRadius: '50%',
            border: hovered ? 'none' : '1.5px solid',
            borderColor: hovered ? 'transparent' : '#A13582',
            background: hovered
              ? 'linear-gradient(135deg, #A13582, #5A30B1)'
              : 'transparent',
            opacity: isVisible ? (hovered ? 0.25 : 0.6) : 0,
            transition:
              'width 0.3s cubic-bezier(0.23,1,0.32,1), height 0.3s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease, background 0.3s ease, border 0.3s ease',
          }}
        />
      </div>

      {/* Inner dot — snaps to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: hovered ? '6px' : clicking ? '10px' : '6px',
            height: hovered ? '6px' : clicking ? '10px' : '6px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #A13582, #5A30B1)',
            opacity: isVisible ? 1 : 0,
            transition:
              'width 0.2s cubic-bezier(0.23,1,0.32,1), height 0.2s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease',
            boxShadow: '0 0 8px 2px rgba(161,53,130,0.4)',
          }}
        />
      </div>
    </>
  );
}
