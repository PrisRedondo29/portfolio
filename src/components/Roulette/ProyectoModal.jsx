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

  const title       = project.titleKey ? t(project.titleKey) : project.title;
  const description = t(project.descriptionKey);
  const tags        = project.tags.map((tag) =>
    tag.startsWith("proyectos.") ? t(tag) : tag
  );

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(7,8,13,0.82)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      {/* Modal container — stop propagation so clicks inside don't close */}
      <div
        className="relative w-full max-w-lg"
        style={{ animation: "modal-in 0.28s cubic-bezier(0.34,1.3,0.64,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
          style={{
            background: "rgba(99,102,241,0.18)",
            border:     "1px solid rgba(99,102,241,0.35)",
          }}
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Reuse the existing ProyectoCard */}
        <ProyectoCard
          title={title}
          description={description}
          tags={tags}
          image={project.image}
          repoLink={project.repoLink}
          demoLink={project.demoLink}
          status={project.status}
        />
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}
