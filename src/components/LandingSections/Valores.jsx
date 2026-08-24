import React from 'react';
import ValoresCard from '../Cards/ValoresCard';
import { valoresData } from '../../constants/valoresData';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaStar } from 'react-icons/fa';

const Valores = () => {
  const { t } = useLanguage();

  return (
    <section id="valores" className="py-20 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaStar className="text-indigo-400" size={28} />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {t('valores.title')}
            </h2>
          </div>
          <span className="font-mono-tech text-xs tracking-widest text-indigo-400/80 uppercase block mb-3">
            // PRINCIPIOS Y METODOLOGÍA DE TRABAJO
          </span>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valoresData.map((item) => (
            <ValoresCard
              key={item.id}
              title={t(item.titleKey)}
              description={t(item.descriptionKey)}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Valores