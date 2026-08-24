import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import links from '../constants/linksNavBar';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-[#07080d]/80 backdrop-blur-xl border-b border-indigo-500/20 shadow-lg shadow-indigo-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-center h-16 relative">

          {/* Mobile Menu Top Bar */}
          <div className="md:hidden w-full flex justify-between items-center">
            <div className="flex gap-2">
              <LanguageSelector align="left" />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 hover:text-indigo-400 focus:outline-none transition-colors p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/20"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-slate-300 hover:text-indigo-300 hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/30 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                {t(link.key)}
              </a>
            ))}

            <div className="flex items-center gap-2 ml-4 border-l border-indigo-500/20 pl-4">
              <LanguageSelector align="right" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#07080d]/95 backdrop-blur-2xl border-b border-indigo-500/20 absolute w-full left-0 shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col items-center">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-slate-300 hover:text-indigo-300 hover:bg-indigo-500/15 block px-3 py-3 rounded-lg text-base font-medium w-full text-center transition-colors cursor-pointer border border-transparent hover:border-indigo-500/30"
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar