import { useEffect } from "react";
import ProyectoCard from "../Cards/ProyectoCard";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * ProyectoModal
 * Props:
 *  - project : full project object from proyectosData, or null
 *  - onClose : () => void
 */
export default function ProyectoModal({ project, onClose }) {
  const { t } = useLanguage();

  /* Close on Escape */
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  /* Prevent body scroll while open */
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  if (!project) return null;

  const title = project.titleKey ? t(project.titleKey) : project.title;
  const description = t(project.descriptionKey);
  const tags = project.tags.map((tag) =>
    tag.startsWith("proyectos.") ? t(tag) : tag
  );

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 pt-20 sm:p-6"
      style={{ background: "rgba(7,8,13,0.88)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      {/* Modal container — max-height constrained & scrollable */}
      <div
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden border border-indigo-500/30 bg-[#0c0e17] shadow-2xl shadow-indigo-950/60"
        style={{ animation: "modal-in 0.25s cubic-bezier(0.34,1.2,0.64,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white bg-slate-900/80 hover:bg-indigo-600/40 border border-indigo-500/30 backdrop-blur-md transition-all shadow-lg cursor-pointer"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Scrollable Card Body */}
        <div className="overflow-y-auto grow p-1">
          <ProyectoCard
            title={title}
            description={description}
            tags={tags}
            image={project.image}
            repoLink={project.repoLink}
            demoLink={project.demoLink}
            status={project.status}
            isModal={true}
          />
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}
