import React from 'react';
import Tag from '../Tag';
import { habilidadesData } from '../../constants/habilidadesData';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaCode, FaServer, FaCloud, FaCog, FaUsers } from 'react-icons/fa';

const Habilidades = () => {
  const { t } = useLanguage();

const skillCategories = [
  {
    icon: FaCode,
    title: "Frontend",
    color: "from-blue-500 to-blue-600",
    skills: ["React 19", "JavaScript", "Next.js", "Tailwindcss 4", "Vite"]
  },
  {
    icon: FaServer,
    title: "Backend & CRM",
    color: "from-green-500 to-green-600",
    skills: ["Node.js", "Express", "Apex", "Java", "MongoDB", "PostgreSQL", "SOQL"]
  },
  {
    icon: FaCloud,
    title: "Cloud & DevOps",
    color: "from-purple-500 to-purple-600",
    skills: ["CI/CD", "Docker", "AWS"]
  },
  {
    icon: FaCog,
    title: "Herramientas & SO",
    color: "from-orange-500 to-orange-600",
    skills: ["Git", "GitHub", "Linux", "Visual Studio Code", "IntelliJ", "Postman", "habilidades.skills.powerbi"]
  }
];

  return (
    <section id="habilidades" className="py-20 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {t('habilidades.title')}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-gray-200 group-hover:bg-purple-500/30 group-hover:text-purple-200 transition-all duration-300 border border-white/10 group-hover:border-purple-400/50"
                      >
                        {t(skill)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Technical & Soft Skills */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 gap-12">
          {/* Habilidades Técnicas Detalladas */}
          <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/40 backdrop-blur-xl border border-purple-500/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
              {t(habilidadesData.tecnicas.titleKey)}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t(habilidadesData.tecnicas.descriptionKey)}
            </p>
            <div className="flex flex-wrap gap-2">
              {habilidadesData.tecnicas.skills.map((skill, index) => (
                <Tag key={index} text={t(skill)} />
              ))}
            </div>
          </div>

          {/* Habilidades Blandas Detalladas */}
          <div className="bg-gradient-to-br from-pink-900/20 to-slate-900/40 backdrop-blur-xl border border-pink-500/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-4">
              {t(habilidadesData.blandas.titleKey)}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
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