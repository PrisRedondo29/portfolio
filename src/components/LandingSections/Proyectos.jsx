import React, { useState } from 'react';
import OrbitalRoulette from '../Roulette/OrbitalRoulette';
import ProyectoModal from '../Roulette/ProyectoModal';
import { proyectosData } from '../../constants/proyectosData';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaCode } from 'react-icons/fa';
import ReactGA from 'react-ga4';

const Proyectos = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  const rouletteProjects = proyectosData.filter((p) => p.showInRoulette);

  const handleProjectSelected = (project) => {
    setSelectedProject(project);
    ReactGA.event('ruleta_proyecto', { proyecto: project.title });
  };

  return (
    <section id="proyectos" className="py-20 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaCode className="text-indigo-400" size={28} />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {t('proyectos.title')}
            </h2>
          </div>
          <span className="font-mono-tech text-xs tracking-widest text-indigo-400/80 uppercase block mb-3">
            // PORTAFOLIO Y DESARROLLOS DESTACADOS
          </span>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4"></div>
          <p className="font-mono-tech text-xs tracking-wider text-indigo-300/75 uppercase">
            {t('proyectos.roulette.hint') || '¡Girá la ruleta y descubrí mis proyectos!'}
          </p>
        </div>

        {/* Orbital roulette */}
        <OrbitalRoulette
          projects={rouletteProjects}
          onProjectSelected={handleProjectSelected}
        />
      </div>

      {/* Modal */}
      <ProyectoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Proyectos;