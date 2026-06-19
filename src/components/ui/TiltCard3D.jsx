import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function TiltCard3D({ 
  children, 
  className,
  containerClassName,
  glare = true,
  scaleOnHover = 1.02,
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse positions
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth mouse positions
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  // Map mouse positions to rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Map mouse position to glare position (using composited x/y transforms)
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "0%"]);
  const glareOpacity = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [0.1, 0, 0.1]
  );

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={cn("relative [perspective:1000px]", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ref}
    >
      <motion.div
        className={cn(
          "relative h-full w-full [transform-style:preserve-3d]",
          className
        )}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
        }}
        whileHover={{ scale: shouldReduceMotion ? 1 : scaleOnHover }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}

        {/* Glare effect */}
        {glare && !shouldReduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-50 rounded-inherit opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)",
              opacity: glareOpacity,
              x: glareX,
              y: glareY,
              left: 0,
              top: 0,
              width: "200%",
              height: "200%",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
