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

    ReactGA.event('envio_formulario_contacto', { status: 'iniciado' });

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
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaPaperPlane className="text-indigo-400" size={28} />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {t('contacto.title')}
            </h2>
          </div>
          <span className="font-mono-tech text-xs tracking-widest text-indigo-400/80 uppercase block mb-3">
            // INICIAR CANAL DE COMUNICACIÓN
          </span>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-6"></div>
        </div>

        <p className="text-slate-300 text-center text-base mb-12 leading-relaxed max-w-xl mx-auto">
          {t('contacto.subtitle')}
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <h3 className="font-mono-tech text-xs text-indigo-400 tracking-wider uppercase mb-4">
              // CANALES DIRECTOS
            </h3>
            
            <a href="mailto:prisredondo29@gmail.com" className="cyber-card flex items-start gap-4 p-5 rounded-2xl border border-indigo-500/20 hover:border-indigo-400/50 transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform">
                <FaEnvelope size={20} />
              </div>
              <div>
                <h4 className="text-slate-100 font-semibold text-sm mb-0.5">Email</h4>
                <p className="text-indigo-300 text-xs font-mono-tech">prisredondo29@gmail.com</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/priscila-redondo-291031219/" target="_blank" rel="noopener noreferrer" className="cyber-card flex items-start gap-4 p-5 rounded-2xl border border-indigo-500/20 hover:border-indigo-400/50 transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform">
                <FaLinkedin size={20} />
              </div>
              <div>
                <h4 className="text-slate-100 font-semibold text-sm mb-0.5">LinkedIn</h4>
                <p className="text-indigo-300 text-xs font-mono-tech">in/priscila-redondo</p>
              </div>
            </a>

            <a href="https://github.com/PrisRedondo29" target="_blank" rel="noopener noreferrer" className="cyber-card flex items-start gap-4 p-5 rounded-2xl border border-indigo-500/20 hover:border-indigo-400/50 transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform">
                <FaGithub size={20} />
              </div>
              <div>
                <h4 className="text-slate-100 font-semibold text-sm mb-0.5">GitHub</h4>
                <p className="text-indigo-300 text-xs font-mono-tech">github.com/PrisRedondo29</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="cyber-card p-6 md:p-8 rounded-2xl border border-indigo-500/20 space-y-5"
          >
            <div className="space-y-1.5">
              <label htmlFor="user_name" className="text-indigo-300 font-mono-tech text-xs uppercase tracking-wider block">
                {t('contacto.name')}
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder={t('contacto.namePlaceholder')}
                required
                className="w-full bg-indigo-950/30 border border-indigo-500/20 rounded-xl px-4 py-2.5 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="user_email" className="text-indigo-300 font-mono-tech text-xs uppercase tracking-wider block">
                {t('contacto.email')}
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                placeholder={t('contacto.emailPlaceholder')}
                required
                className="w-full bg-indigo-950/30 border border-indigo-500/20 rounded-xl px-4 py-2.5 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-indigo-300 font-mono-tech text-xs uppercase tracking-wider block">
                {t('contacto.message')}
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                placeholder={t('contacto.messagePlaceholder')}
                required
                className="w-full bg-indigo-950/30 border border-indigo-500/20 rounded-xl px-4 py-2.5 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-600/30 border border-indigo-400/30 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaPaperPlane size={14} />
              {isSending ? t('contacto.sending') : t('contacto.send')}
            </button>
          </form>
        </div>

        <p className="cyber-card text-slate-300 text-center text-sm mt-12 leading-relaxed border border-indigo-500/20 p-5 rounded-2xl">
          {t('contacto.feedback')}
        </p>
      </div>
    </section>
  )
}

export default Contacto