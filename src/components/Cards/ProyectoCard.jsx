import React from 'react';
import Tag from '../Tag';
import { useLanguage } from '../../contexts/LanguageContext';
import ReactGA from "react-ga4";

const ProyectoCard = ({ title, description, tags, image, repoLink, demoLink, status, isModal = false }) => {
  const { t } = useLanguage();
  return (
    <div className={`group relative bg-[#0d0f19] border border-indigo-500/25 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col shadow-xl shadow-indigo-950/40 ${!isModal ? 'hover:border-indigo-400/60 hover:shadow-indigo-500/20 hover:-translate-y-1' : ''}`}>
      {/* In-Progress Badge */}
      {status === 'in-progress' && (
        <div className="absolute top-3 right-3 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono-tech px-3 py-1 rounded-full z-10 backdrop-blur-md flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          {t('proyectos.inProgress')}
        </div>
      )}

      {/* Image Area */}
      {image ? (
        <div className={`w-full overflow-hidden relative ${isModal ? 'h-44 sm:h-52' : 'aspect-video'}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0f19] transition-all duration-300"></div>
        </div>
      ) : (
        <div className="h-40 bg-indigo-950/40 w-full relative flex items-center justify-center border-b border-indigo-500/20">
          <div className="text-indigo-400/40 text-4xl font-mono-tech">💻</div>
        </div>
      )}

      <div className={`${isModal ? 'p-5 sm:p-6' : 'p-6'} flex flex-col grow`}>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3 tracking-tight group-hover:text-indigo-200 transition-colors">
          {title}
        </h3>
        
        <div 
          className="text-slate-300 text-sm leading-relaxed mb-5 grow"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex flex-wrap gap-1.5 mt-auto mb-6">
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => ReactGA.event('ver_proyecto', { tipo: 'Demo', proyecto: title })}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 rounded-xl text-white text-center text-xs font-bold transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group/btn"
            >
              <span>{t('proyectos.demo')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => ReactGA.event('ver_proyecto', { tipo: 'Repositorio', proyecto: title })}
              className={`py-2.5 px-4 rounded-xl text-white text-center text-xs font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group/btn ${demoLink ? 'flex-1 bg-indigo-950/50 border border-indigo-500/30 hover:bg-indigo-900/50 hover:border-indigo-400/60' : 'w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 shadow-lg shadow-indigo-600/30'}`}
            >
              <span>{t('proyectos.repo')}</span>
              {demoLink ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover/btn:opacity-100 transition-opacity group-hover/btn:translate-x-0.5">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 transition-transform">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProyectoCard;
