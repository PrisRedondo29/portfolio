import React, { useState } from 'react';
import { FaUsers, FaComments, FaChartLine, FaCalendarCheck, FaSyncAlt } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const iconMap = {
  FaUsers: FaUsers,
  FaComments: FaComments,
  FaChartLine: FaChartLine,
  FaCalendarCheck: FaCalendarCheck
};

const ValoresCard = ({ title, description, icon }) => {
  const { t } = useLanguage();
  const IconComponent = iconMap[icon] || FaUsers;
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="flip-card-container group h-72 w-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        
        {/* Front Face */}
        <div className="flip-card-front cyber-card p-8 flex flex-col items-center justify-center text-center border border-indigo-500/20 group-hover:border-indigo-400/60 shadow-xl shadow-indigo-950/20 group-hover:shadow-indigo-500/25 transition-all duration-500 relative overflow-hidden">
          
          {/* Tech Corner Accent Decorators */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-indigo-400/40 rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-indigo-400/40 rounded-tr-xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-indigo-400/40 rounded-bl-xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-indigo-400/40 rounded-br-xl pointer-events-none"></div>

          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="p-4 bg-indigo-950/60 border border-indigo-500/30 rounded-2xl text-indigo-400 mb-5 group-hover:scale-110 group-hover:border-indigo-400/60 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-500 relative z-10">
            <IconComponent size={36} />
          </div>
          
          <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-indigo-200 transition-colors relative z-10">
            {title}
          </h3>
          
          <p className="text-indigo-400/90 text-xs mt-2 font-mono-tech uppercase tracking-widest flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-all duration-300 relative z-10">
            <FaSyncAlt size={10} className="group-hover:rotate-180 transition-transform duration-700" />
            [ {t('valores.click') || 'Girar'} ]
          </p>
        </div>

        {/* Back Face */}
        <div className="flip-card-back cyber-card p-8 flex flex-col items-center justify-center text-center border border-indigo-400/60 bg-[#0c0e18] shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
          
          {/* Back ambient radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/15 via-transparent to-transparent pointer-events-none"></div>
          
          <span className="font-mono-tech text-[10px] tracking-widest text-indigo-400/75 uppercase mb-2 relative z-10">
            // PRINCIPIO CLAVE
          </span>

          <h3 className="text-lg font-bold text-indigo-200 mb-3 border-b border-indigo-500/20 pb-2 w-full text-center relative z-10">
            {title}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed relative z-10">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ValoresCard;