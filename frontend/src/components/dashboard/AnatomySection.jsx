import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedNumber = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}%</>;
};

const AnatomySection = () => {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 1.5, type: "spring" }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">

      {/* Container for Image & SVG Overlay */}
      <div className="relative w-[300px] md:w-[400px] h-full flex justify-center items-center isolate">

        {/* The Human Image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.95, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          src="/HumanAna.png"
          alt="Human Body Silhouette"
          className="w-full h-auto object-contain z-10 drop-shadow-2xl"
        />
        
        {/* Subtle breathing effect */}
        <motion.div
           animate={{ scale: [1, 1.02, 1] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 z-0 bg-cyan-500/5 rounded-full blur-3xl"
        />

        {/* SVG Drawing Layer for the lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 400 600">

          {/* 1. Head (Right) */}
          <motion.line variants={lineVariants} initial="hidden" animate="visible" x1="210" y1="100" x2="300" y2="100" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" />
          <foreignObject x="310" y="88" width="50" height="30">
            <motion.div variants={textVariants} initial="hidden" animate="visible" className="text-[#10b981] font-black text-sm bg-transparent drop-shadow-md"><AnimatedNumber end={78} /></motion.div>
          </foreignObject>

          {/* 2. Chest/Shoulder (Left) */}
          <motion.line variants={lineVariants} initial="hidden" animate="visible" x1="100" y1="200" x2="190" y2="200" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" />
          <foreignObject x="50" y="188" width="50" height="30">
            <motion.div variants={textVariants} initial="hidden" animate="visible" className="text-[#0ea5e9] font-black text-sm text-right bg-transparent drop-shadow-md"><AnimatedNumber end={63} /></motion.div>
          </foreignObject>

          {/* 3. Wrist (Right) */}
          <motion.line variants={lineVariants} initial="hidden" animate="visible" x1="280" y1="320" x2="350" y2="320" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" />
          <foreignObject x="360" y="308" width="50" height="30">
            <motion.div variants={textVariants} initial="hidden" animate="visible" className="text-[#3b82f6] font-black text-sm bg-transparent drop-shadow-md"><AnimatedNumber end={53} /></motion.div>
          </foreignObject>

          {/* 4. Knee (Left) */}
          <motion.line variants={lineVariants} initial="hidden" animate="visible" x1="100" y1="435" x2="185" y2="435" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" />
          <foreignObject x="50" y="423" width="50" height="30">
            <motion.div variants={textVariants} initial="hidden" animate="visible" className="text-[#10b981] font-black text-sm text-right bg-transparent drop-shadow-md"><AnimatedNumber end={86} /></motion.div>
          </foreignObject>

          {/* 5. Ankle (Right) */}
          <motion.line variants={lineVariants} initial="hidden" animate="visible" x1="245" y1="560" x2="320" y2="560" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" />
          <foreignObject x="330" y="548" width="50" height="30">
            <motion.div variants={textVariants} initial="hidden" animate="visible" className="text-[#f97316] font-black text-sm bg-transparent drop-shadow-md"><AnimatedNumber end={43} /></motion.div>
          </foreignObject>

        </svg>

      </div>
    </div>
  )
}

export default AnatomySection;
