import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from '../../contexts/LanguageContext';
import ReactGA from "react-ga4";

const Hero = () => {
  const { t, language } = useLanguage();

  const cvPath = language === 'en' ? 'files/PriscilaRedondo-English.pdf' : 'files/PriscilaRedondo-ConTodo.pdf';
  const cvFileName = language === 'en' ? 'PriscilaRedondo-English.pdf' : 'PriscilaRedondo-ConTodo.pdf';

  return (
    <section id="hero" className="relative pt-24 pb-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Profile Card */}
        <div className="relative mb-16">
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/15 p-8 md:p-12 overflow-hidden">
            {/* Background Gradient Effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
              {/* Photo Section */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-3xl opacity-80"></div>
                  <img 
                    src="imgs/Priscila Redondo.jpeg" 
                    alt="Priscila Redondo" 
                    className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl object-cover shadow-[0_30px_80px_rgba(168,85,247,0.18)]"
                  />
                </div>
              </div>

              {/* Info Section */}
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                    Priscila Redondo
                  </h1>
                  <div className="h-1 w-24 bg-linear-to-r from-purple-500 to-pink-500 rounded-full mb-6"></div>
                  
                  <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 mb-4">
                    {t('hero.role1')} <br className="hidden md:block" /> & {t('hero.role2')}
                  </h2>

                  <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                    {t('hero.description')}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <a href="mailto:prisredondo29@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <FaEnvelope className="text-purple-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">prisredondo29@gmail.com</span>
                  </a>
                  <a href="tel:+541123456789" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <FaPhone className="text-purple-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">Disponible para hablar</span>
                  </a>
                  <a href="https://www.linkedin.com/in/priscila-redondo-291031219/" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <FaLinkedin className="text-purple-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">linkedin.com/in/priscila-redondo</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaMapMarkerAlt className="text-purple-500" />
                    <span className="text-sm">Buenos Aires, Argentina</span>
                  </div>
                </div>

                {/* Social Links & CTA Buttons */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center justify-center sm:justify-start">
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start w-full sm:w-auto">
                    <a
                      href="https://github.com/PrisRedondo29"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => ReactGA.event('click_red_social', { plataforma: 'GitHub', seccion: 'Hero' })}
                      className="p-3 rounded-full bg-white/10 hover:bg-purple-500/30 text-white hover:text-purple-300 transition-all duration-300 border border-white/10 hover:border-purple-500/30"
                      title="GitHub"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/priscila-redondo-291031219/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => ReactGA.event('click_red_social', { plataforma: 'LinkedIn', seccion: 'Hero' })}
                      className="p-3 rounded-full bg-white/10 hover:bg-purple-500/30 text-white hover:text-purple-300 transition-all duration-300 border border-white/10 hover:border-purple-500/30"
                      title="LinkedIn"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>

                  <a href={cvPath} target="_blank" rel="noopener noreferrer" 
                    onClick={() => ReactGA.event('interaccion_cv', { accion: 'Ver', seccion: 'Hero' })}
                    className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-linear-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 text-white text-center">
                    {t('hero.viewCV')}
                  </a>

                  <a download={cvFileName} href={cvPath} 
                    onClick={() => ReactGA.event('interaccion_cv', { accion: 'Descargar', seccion: 'Hero' })}
                    className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-purple-500/50 text-white text-center">
                    {t('hero.downloadCV')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats or CTA Section */}
        <div className="text-center">
          <p className="text-gray-400 text-lg">
            ¿Interesado en trabajar juntos? <a href="#contacto" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Contactame →</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero