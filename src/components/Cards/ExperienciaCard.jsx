import React from 'react';

const ExperienciaCard = ({ title, institution, description }) => {
  return (
    <div className="cyber-card group relative p-6 md:p-8 rounded-2xl h-full overflow-hidden border border-indigo-500/20 hover:border-indigo-400/50 transition-all duration-300 shadow-xl shadow-indigo-950/20 hover:shadow-indigo-500/10">
      
      {/* Node Decorator */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0 mt-1.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-200 transition-colors">
            {title}
          </h3>
          <span className="font-mono-tech text-xs text-indigo-400 tracking-wide block mt-1">
            // {institution}
          </span>
        </div>
      </div>
      
      <p className="text-slate-300 text-sm leading-relaxed pl-7 group-hover:text-slate-200 transition-colors">
        {description}
      </p>
    </div>
  );
};

export default ExperienciaCard;