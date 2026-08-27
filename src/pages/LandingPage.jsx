import React, { useEffect } from 'react'
import ReactGA from 'react-ga4'
import Hero from '../components/LandingSections/Hero'
import Experiencia from '../components/LandingSections/Experiencia'
import Habilidades from '../components/LandingSections/Habilidades'
import Proyectos from '../components/LandingSections/Proyectos'
import SobreMi from '../components/LandingSections/SobreMi'
import Valores from '../components/LandingSections/Valores'
import Contacto from '../components/LandingSections/Contacto'
import NavBar from '../components/NavBar'

const LandingPage = () => {
  useEffect(() => {
    // Registra la visita a la página
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Landing Page" });
  }, []);

  return (
    <div className="min-h-screen bg-[#07080d] cyber-grid text-slate-100 relative overflow-x-hidden">
      <NavBar />
      
      {/* Subtle Technological Ambient Glows */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px] translate-y-1/3 -translate-x-1/3 pointer-events-none z-0"></div>
      <div className="fixed top-1/2 left-1/2 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Hero />
        <Proyectos />
        <Experiencia />
        <Habilidades />
        <SobreMi />
        <Valores />
        <Contacto />
      </div>
    </div>
  )
}

export default LandingPage