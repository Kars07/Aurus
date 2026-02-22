import React from 'react';
import { motion } from 'framer-motion';

const SnowParticles = ({ count = 30 }) => {
  // Generate random properties for each snowflake to make them look organic
  const snowflakes = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // randomized starting X position (vw)
    size: Math.random() * 4 + 2, // random size between 2px and 6px
    duration: Math.random() * 10 + 10, // fall duration between 10s and 20s
    delay: Math.random() * -20, // negative delay so they start already scattered on screen
    opacity: Math.random() * 0.5 + 0.2 // random opacity between 0.2 and 0.7
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-cyan-200"
          style={{
            width: flake.size,
            height: flake.size,
            left: `${flake.x}%`,
            top: -20, // start slightly above the screen
            opacity: flake.opacity,
            boxShadow: `0 0 ${flake.size * 2}px rgba(165, 243, 252, 0.4)` // tiny glow
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [
              `${flake.x}%`,
              `${flake.x + (Math.random() * 5 - 2.5)}%`, // sway slightly left/right
              `${flake.x}%`
            ]
          }}
          transition={{
            y: {
              duration: flake.duration,
              repeat: Infinity,
              ease: "linear",
              delay: flake.delay
            },
            x: {
              duration: flake.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: flake.delay
            }
          }}
        />
      ))}
    </div>
  );
};

export default SnowParticles;
