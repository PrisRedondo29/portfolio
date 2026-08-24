
import React, { useState } from 'react';
import SobreMiCard from '../SobreMiCard';
import { educationData, aboutText } from '../../constants/sobreMiData';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SobreMi = () => {
  const { t } = useLanguage();
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="sobre-mi" className="py-20 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaUser className="text-indigo-400" size={28} />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {t('sobremi.title')}
            </h2>
          </div>
          <span className="font-mono-tech text-xs tracking-widest text-indigo-400/80 uppercase block mb-3">
            // FORMACIÓN Y PERFIL PERSONAL
          </span>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Education & Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {educationData.map((item) => (
            <SobreMiCard
              key={item.id}
              institution={t(item.institutionKey)}
              title={t(item.titleKey)}
              description={t(item.descriptionKey)}
              icon={item.icon}
              url={item.url}
            />
          ))}
        </div>

        {/* Toggle Button & Collapsible Text */}
        <div className="mt-12 flex flex-col items-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-mono-tech text-xs tracking-wider border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-600/20 hover:text-white hover:border-indigo-400/60 shadow-lg shadow-indigo-950/40 transition-all duration-300 cursor-pointer"
          >
            {showMore ? (
              <>
                {t('sobremi.showLess')} <FaChevronUp size={12} />
              </>
            ) : (
              <>
                {t('sobremi.showMore')} <FaChevronDown size={12} />
              </>
            )}
          </button>

          {/* Collapsible Content */}
          <div
            className={`w-full transition-all duration-500 ease-in-out overflow-hidden ${
              showMore ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 text-sm leading-relaxed">
              {aboutText.map((paragraphKey, index) => (
                <p 
                  key={index} 
                  className="cyber-card p-6 rounded-2xl border border-indigo-500/20 hover:border-indigo-400/50 transition-all duration-300"
                >
                  {t(paragraphKey)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreMi;