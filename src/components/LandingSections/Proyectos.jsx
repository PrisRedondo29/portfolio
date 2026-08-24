import React, { useState } from 'react';
import OrbitalRoulette from '../Roulette/OrbitalRoulette';
import ProyectoModal from '../Roulette/ProyectoModal';
import { proyectosData } from '../../constants/proyectosData';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaLaptopCode } from 'react-icons/fa';
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

        {/* Section header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaLaptopCode className="text-purple-500" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {t('proyectos.title')}
              </span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-4" />
          <p
            style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "rgba(99,102,241,0.75)",
            }}
          >
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