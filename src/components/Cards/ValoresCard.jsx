import React, { useState } from 'react';
import { FaUsers, FaComments, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
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
      className="group h-72 w-full [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : 'group-hover:-translate-y-1'}`}
      >
        {/* Front Face */}
        <div 
          className="cyber-card absolute inset-0 w-full h-full p-8 rounded-2xl flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:translateZ(1px)] border border-indigo-500/20 group-hover:border-indigo-400/60 transition-all duration-500 shadow-xl shadow-indigo-950/20 group-hover:shadow-indigo-500/30"
        >
          <div className="p-4 bg-indigo-950/60 border border-indigo-500/30 rounded-2xl text-indigo-400 mb-5 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700">
            <IconComponent size={36} />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-indigo-200 transition-colors">{title}</h3>
          <p className="text-indigo-400 text-xs mt-2 font-mono-tech uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
            [ {t('valores.click')} ]
          </p>
        </div>

        {/* Back Face */}
        <div 
          className="cyber-card absolute inset-0 w-full h-full p-8 rounded-2xl flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)] border border-indigo-400/60 bg-[#0d0f19] shadow-2xl shadow-indigo-500/30"
        >
          <h3 className="text-lg font-bold text-indigo-300 mb-3">{title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ValoresCard;