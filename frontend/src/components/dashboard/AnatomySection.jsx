const AnatomySection = () => {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative w-full h-auto">
      <div className="flex justify-center h-full items-center">
        <div className="relative w-full flex justify-center py-4">
          {/* Skeleton/Body Image Overlay */}
          <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full mix-blend-screen scale-75"></div>
          <img
            src="/HumanAna.png"
            alt="Human Body Silhouette"
            className="w-48 xl:w-56 h-auto object-contain drop-shadow-[0_0_15px_rgba(79,70,229,0.3)] relative z-10 opacity-90"
          />
        </div>
      </div>
    </div>
  )
}

export default AnatomySection;
