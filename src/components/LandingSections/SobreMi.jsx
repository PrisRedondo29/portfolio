
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
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaUser className="text-purple-500" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {t('sobremi.title')}
              </span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Education & Experience Cards - 2 Columns */}
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
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold border border-purple-500/30 bg-purple-950/20 text-purple-300 hover:bg-purple-500/20 hover:text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer"
          >
            {showMore ? (
              <>
                {t('sobremi.showLess')} <FaChevronUp size={14} />
              </>
            ) : (
              <>
                {t('sobremi.showMore')} <FaChevronDown size={14} />
              </>
            )}
          </button>

          {/* Collapsible Content */}
          <div
            className={`w-full transition-all duration-500 ease-in-out overflow-hidden ${
              showMore ? 'max-h-[2000px] opacity-100 mt-10' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-lg leading-relaxed">
              {aboutText.map((paragraphKey, index) => (
                <p 
                  key={index} 
                  className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 p-6 rounded-xl hover:border-purple-400/50 transition-all duration-300 hover:text-gray-100"
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