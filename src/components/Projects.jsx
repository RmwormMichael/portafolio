import React from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import projects from '../data/projects'

const Projects = () => {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="section-subtitle">
            Una selección de mis proyectos más recientes y desafiantes.
            Cada proyecto representa habilidades específicas y soluciones a problemas reales.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-card"
            >
              <div className="project-header">
                <div className="project-meta">
                  <span className="project-type">{project.type}</span>
                  <span className="project-stack">{project.stack}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              <div className="project-footer">
                <div className="project-links">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FiExternalLink />
                    Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FiGithub />
                    Código
                  </a>
                </div>
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

<style jsx>{`
        .projects-section {
          background-color: var(--bg-secondary);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .project-card {
          background: var(--card-bg);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: var(--shadow);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid var(--border-color);
        }

        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-hover);
          border-color: var(--primary);
        }

        .project-header {
          flex: 1;
        }

        .project-meta {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .project-type {
          background: rgba(37, 99, 235, 0.1);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .project-stack {
          background: rgba(124, 58, 237, 0.1);
          color: var(--secondary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .project-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: var(--text-primary);
        }

        .project-description {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .project-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .project-links {
          display: flex;
          gap: 15px;
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: var(--transition);
        }

        .project-link:hover {
          color: var(--primary-dark);
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-tag {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  )
}

export default Projects