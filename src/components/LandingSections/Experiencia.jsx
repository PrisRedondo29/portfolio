import React from 'react';
import ExperienciaCard from '../Cards/ExperienciaCard';
import { experienciaData } from '../../constants/experienciaData';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaBriefcase } from 'react-icons/fa';

const Experiencia = () => {
  const { t } = useLanguage();

  return (
    <section id="experiencia" className="py-20 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaBriefcase className="text-indigo-400" size={28} />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {t('experiencia.title')}
            </h2>
          </div>
          <span className="font-mono-tech text-xs tracking-widest text-indigo-400/80 uppercase block mb-3">
            // TRAYECTORIA Y LOGROS TÉCNICOS
          </span>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienciaData.map((item) => (
            <ExperienciaCard
              key={item.id}
              title={t(item.titleKey)}
              institution={t(item.institutionKey)}
              description={t(item.descriptionKey)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experiencia