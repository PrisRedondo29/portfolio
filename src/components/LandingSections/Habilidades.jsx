import React from 'react';
import Tag from '../Tag';
import { habilidadesData } from '../../constants/habilidadesData';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaCode, FaServer, FaCloud, FaCog, FaLaptopCode } from 'react-icons/fa';

const Habilidades = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      icon: FaCode,
      title: "Frontend",
      color: "border-blue-500/30 text-blue-400 bg-blue-950/30",
      skills: ["React 19", "JavaScript", "Next.js", "Tailwindcss 4", "Vite"]
    },
    {
      icon: FaServer,
      title: "Backend & CRM",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/30",
      skills: ["Node.js", "Express", "Apex", "Java", "MongoDB", "PostgreSQL", "SOQL"]
    },
    {
      icon: FaCloud,
      title: "Cloud & DevOps",
      color: "border-purple-500/30 text-purple-400 bg-purple-950/30",
      skills: ["CI/CD", "Docker", "AWS"]
    },
    {
      icon: FaCog,
      title: "Herramientas & SO",
      color: "border-amber-500/30 text-amber-400 bg-amber-950/30",
      skills: ["Git", "GitHub", "Linux", "Visual Studio Code", "IntelliJ", "Postman", "habilidades.skills.powerbi"]
    }
  ];

  return (
    <section id="habilidades" className="py-20 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaLaptopCode className="text-indigo-400" size={28} />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {t('habilidades.title')}
            </h2>
          </div>
          <span className="font-mono-tech text-xs tracking-widest text-indigo-400/80 uppercase block mb-3">
            // TECH STACK & COMPETENCIAS
          </span>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="cyber-card p-6 rounded-2xl border border-indigo-500/20 hover:border-indigo-400/50 transition-all duration-300 shadow-xl shadow-indigo-950/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl border ${category.color}`}>
                    <IconComponent size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono-tech bg-indigo-950/40 text-indigo-200 border border-indigo-500/20 hover:border-indigo-400/50 transition-colors"
                    >
                      {t(skill)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Technical & Soft Skills */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Habilidades Técnicas Detalladas */}
          <div className="cyber-card p-8 rounded-2xl border border-indigo-500/20">
            <h3 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
              <span className="font-mono-tech text-indigo-400 text-sm">//</span>
              {t(habilidadesData.tecnicas.titleKey)}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {t(habilidadesData.tecnicas.descriptionKey)}
            </p>
            <div className="flex flex-wrap gap-2">
              {habilidadesData.tecnicas.skills.map((skill, index) => (
                <Tag key={index} text={t(skill)} />
              ))}
            </div>
          </div>

          {/* Habilidades Blandas Detalladas */}
          <div className="cyber-card p-8 rounded-2xl border border-indigo-500/20">
            <h3 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
              <span className="font-mono-tech text-purple-400 text-sm">//</span>
              {t(habilidadesData.blandas.titleKey)}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {t(habilidadesData.blandas.descriptionKey)}
            </p>
            <div className="flex flex-wrap gap-2">
              {habilidadesData.blandas.skills.map((skill, index) => (
                <Tag key={index} text={t(skill)} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Habilidades