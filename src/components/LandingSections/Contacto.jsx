import React, { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../contexts/LanguageContext';
import ReactGA from "react-ga4";

const Contacto = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const { t } = useLanguage();

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Seguimiento de GA4 para el envío del formulario
    ReactGA.event('envio_formulario_contacto', { status: 'iniciado' });

    // Reemplaza estos valores con tus credenciales de EmailJS
    // Service ID, Template ID, Public Key
    emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        alert(t('contacto.alertSuccess'));
        form.current.reset();
        setIsSending(false);
      }, (error) => {
        console.log(error.text);
        alert(t('contacto.alertError'));
        setIsSending(false);
      });
  };

  return (
    <section id="contacto" className="py-20 px-6 md:px-20 relative">
      <div className="max-w-4xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center gap-3 mb-4 sm:flex-row sm:gap-4">
            <FaPaperPlane className="text-purple-500" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {t('contacto.title')}
              </span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
        </div>

        <p className="text-gray-300 text-center text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
          {t('contacto.subtitle')}
        </p>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-6">Conecta conmigo</h3>
            
            <a href="mailto:prisredondo29@gmail.com" className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-900/20 to-slate-900/40 backdrop-blur-xl border border-purple-500/20 rounded-xl hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 group-hover:scale-110 transition-transform duration-300">
                <FaEnvelope className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Email</h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">prisredondo29@gmail.com</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/priscila-redondo-291031219/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-900/20 to-slate-900/40 backdrop-blur-xl border border-purple-500/20 rounded-xl hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 group-hover:scale-110 transition-transform duration-300">
                <FaLinkedin className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">LinkedIn</h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">linkedin.com/in/priscila-redondo</p>
              </div>
            </a>

            <a href="https://github.com/PrisRedondo29" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-900/20 to-slate-900/40 backdrop-blur-xl border border-purple-500/20 rounded-xl hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
              <div className="p-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 group-hover:scale-110 transition-transform duration-300">
                <FaGithub className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">GitHub</h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">github.com/PrisRedondo29</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-500/30 p-6 md:p-8 rounded-2xl"
          >
            <div className="space-y-2">
              <label htmlFor="user_name" className="text-purple-300 font-semibold ml-1 block">{t('contacto.name')}</label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder={t('contacto.namePlaceholder')}
                required
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="user_email" className="text-purple-300 font-semibold ml-1 block">{t('contacto.email')}</label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                placeholder={t('contacto.emailPlaceholder')}
                required
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-purple-300 font-semibold ml-1 block">{t('contacto.message')}</label>
              <textarea
                name="message"
                id="message"
                rows="4"
                placeholder={t('contacto.messagePlaceholder')}
                required
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              <FaPaperPlane size={16} />
              {isSending ? t('contacto.sending') : t('contacto.send')}
            </button>
          </form>
        </div>

        <p className="text-white text-center text-lg mt-12 leading-relaxed bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/20 p-6 rounded-xl">
          {t('contacto.feedback')}
        </p>
      </div>
    </section>
  )
}

export default Contacto