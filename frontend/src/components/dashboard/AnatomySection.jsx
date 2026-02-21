const AnatomySection = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      
      {/* Container for Image & SVG Overlay */}
      <div className="relative w-[300px] md:w-[400px] h-full flex justify-center items-center isolate">
        
        {/* The Human Image */}
        <img
          src="/HumanAna.png"
          alt="Human Body Silhouette"
          className="w-full h-auto object-contain z-10 opacity-95 drop-shadow-xl"
        />

        {/* SVG Drawing Layer for the lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 400 600">
          
          {/* 1. Head (Right) */}
          <line x1="210" y1="100" x2="300" y2="100" stroke="#64748b" strokeWidth="1" />
          <foreignObject x="310" y="88" width="50" height="30">
            <div className="text-[#10b981] font-bold text-sm bg-transparent">78%</div>
          </foreignObject>

          {/* 2. Chest/Shoulder (Left) */}
          <line x1="100" y1="200" x2="190" y2="200" stroke="#64748b" strokeWidth="1" />
          <foreignObject x="50" y="188" width="50" height="30">
            <div className="text-[#0ea5e9] font-bold text-sm text-right bg-transparent">63%</div>
          </foreignObject>

          {/* 3. Wrist (Right) */}
          <line x1="280" y1="320" x2="350" y2="320" stroke="#64748b" strokeWidth="1" />
          <foreignObject x="360" y="308" width="50" height="30">
            <div className="text-[#3b82f6] font-bold text-sm bg-transparent">53%</div>
          </foreignObject>

          {/* 4. Knee (Left) */}
          <line x1="100" y1="435" x2="185" y2="435" stroke="#64748b" strokeWidth="1" />
          <foreignObject x="50" y="423" width="50" height="30">
            <div className="text-[#10b981] font-bold text-sm text-right bg-transparent">86%</div>
          </foreignObject>

          {/* 5. Ankle (Right) */}
          <line x1="245" y1="560" x2="320" y2="560" stroke="#64748b" strokeWidth="1" />
          <foreignObject x="330" y="548" width="50" height="30">
            <div className="text-[#f97316] font-bold text-sm bg-transparent">43%</div>
          </foreignObject>

        </svg>

      </div>
    </div>
  )
}

export default AnatomySection;
