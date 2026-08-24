import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from '../../contexts/LanguageContext';
import ReactGA from "react-ga4";

const Hero = () => {
  const { t, language } = useLanguage();

  const cvPath = language === 'en' ? 'files/PriscilaRedondo-English.pdf' : 'files/PriscilaRedondo-ConTodo.pdf';
  const cvFileName = language === 'en' ? 'PriscilaRedondo-English.pdf' : 'PriscilaRedondo-ConTodo.pdf';

  return (
    <section id="hero" className="relative pt-28 pb-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Status Tag */}
        <div className="flex justify-center md:justify-start mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="font-mono-tech text-xs tracking-wider text-indigo-300 uppercase">
              STATUS: ONLINE // AVAILABLE FOR HIRE
            </span>
          </div>
        </div>

        {/* Main Developer Badge Card */}
        <div className="relative mb-12">
          <div className="cyber-card rounded-2xl p-8 md:p-12 overflow-hidden relative border border-indigo-500/25 shadow-2xl shadow-indigo-950/40">
            
            {/* Corner Tech Decorators */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-400/60 rounded-tl-2xl pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-indigo-400/60 rounded-tr-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-400/60 rounded-bl-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-400/60 rounded-br-2xl pointer-events-none"></div>

            {/* Subtle glow behind card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
              
              {/* Photo Section */}
              <div className="flex justify-center md:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>
                  <img 
                    src="imgs/Priscila Redondo.jpeg" 
                    alt="Priscila Redondo" 
                    className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl object-cover border border-indigo-400/30 shadow-2xl"
                  />
                </div>
              </div>

              {/* Info Section */}
              <div className="md:col-span-2">
                <div className="mb-6">
                  <span className="font-mono-tech text-xs text-indigo-400 tracking-widest block mb-2 uppercase">
                    // PROFILE ID: DEV-PRISCILA-REDONDO
                  </span>
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-white">
                    Priscila Redondo
                  </h1>
                  
                  <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-4">
                    {t('hero.role1')} <br className="hidden md:block" /> & {t('hero.role2')}
                  </h2>

                  <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                    {t('hero.description')}
                  </p>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 font-mono-tech text-xs">
                  <a href="mailto:prisredondo29@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-indigo-300 transition-colors p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/10 group">
                    <FaEnvelope className="text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span>prisredondo29@gmail.com</span>
                  </a>
                  <a href="tel:+541123456789" className="flex items-center gap-3 text-slate-300 hover:text-indigo-300 transition-colors p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/10 group">
                    <FaPhone className="text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span>Disponible para hablar</span>
                  </a>
                  <a href="https://www.linkedin.com/in/priscila-redondo-291031219/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-indigo-300 transition-colors p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/10 group">
                    <FaLinkedin className="text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span>in/priscila-redondo</span>
                  </a>
                  <div className="flex items-center gap-3 text-slate-300 p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/10">
                    <FaMapMarkerAlt className="text-indigo-400" />
                    <span>Buenos Aires, Argentina</span>
                  </div>
                </div>

                {/* Social Links & CTA Buttons */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center justify-center sm:justify-start">
                  <div className="flex gap-3 justify-center sm:justify-start w-full sm:w-auto">
                    <a
                      href="https://github.com/PrisRedondo29"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => ReactGA.event('click_red_social', { plataforma: 'GitHub', seccion: 'Hero' })}
                      className="p-3 rounded-xl bg-indigo-950/50 hover:bg-indigo-600/30 text-slate-200 hover:text-indigo-200 transition-all duration-300 border border-indigo-500/25 hover:border-indigo-400/50"
                      title="GitHub"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/priscila-redondo-291031219/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => ReactGA.event('click_red_social', { plataforma: 'LinkedIn', seccion: 'Hero' })}
                      className="p-3 rounded-xl bg-indigo-950/50 hover:bg-indigo-600/30 text-slate-200 hover:text-indigo-200 transition-all duration-300 border border-indigo-500/25 hover:border-indigo-400/50"
                      title="LinkedIn"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>

                  <a href={cvPath} target="_blank" rel="noopener noreferrer" 
                    onClick={() => ReactGA.event('interaccion_cv', { accion: 'Ver', seccion: 'Hero' })}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 text-white text-center border border-indigo-400/30">
                    {t('hero.viewCV')}
                  </a>

                  <a download={cvFileName} href={cvPath} 
                    onClick={() => ReactGA.event('interaccion_cv', { accion: 'Descargar', seccion: 'Hero' })}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 bg-indigo-950/40 hover:bg-indigo-900/40 border border-indigo-500/30 hover:border-indigo-400/60 text-slate-200 text-center">
                    {t('hero.downloadCV')}
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Quick CTA Prompt */}
        <div className="text-center">
          <p className="text-slate-400 text-sm font-mono-tech">
            ¿Interesado en trabajar juntos?{' '}
            <a 
              href="#contacto" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer"
            >
              Contactame →
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}

export default Hero