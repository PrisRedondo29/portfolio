import React from 'react';
import { FaUniversity, FaCode, FaMicroscope, FaSalesforce, FaArrowRight } from 'react-icons/fa';

const iconMap = {
    FaUniversity: FaUniversity,
    FaCode: FaCode,
    FaMicroscope: FaMicroscope,
    FaSalesforce: FaSalesforce
};

import { useLanguage } from '../contexts/LanguageContext';

const SobreMiCard = ({ institution, title, description, icon, url }) => {
    const { t } = useLanguage();
    const IconComponent = iconMap[icon] || FaUniversity;
    const CardWrapper = url ? 'a' : 'div';
    const wrapperProps = url ? {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer"
    } : {};

    return (
        <CardWrapper
            {...wrapperProps}
            className="cyber-card p-6 rounded-2xl border border-indigo-500/20 hover:border-indigo-400/50 transition-all duration-300 group block overflow-hidden shadow-xl shadow-indigo-950/20"
        >
            <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <IconComponent size={24} />
                </div>
                <div className="flex-grow">
                    <span className="font-mono-tech text-xs text-indigo-400 tracking-wider block mb-1">
                        // {institution}
                    </span>
                    <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-indigo-200 transition-colors">
                        {title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-3 group-hover:text-slate-200 transition-colors leading-relaxed">
                        {description}
                    </p>
                    {url && (
                        <span className="text-indigo-400 text-xs font-mono-tech group-hover:text-indigo-300 transition-colors inline-flex items-center gap-1.5 group-hover:gap-2">
                            {t('sobremi.moreInfo')} <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    )}
                </div>
            </div>
        </CardWrapper>
    );
};

export default SobreMiCard;
