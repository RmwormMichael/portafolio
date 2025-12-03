import React from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiDatabase, FiServer, FiLayout } from 'react-icons/fi'

const Skills = () => {
  const skills = [
    {
      category: 'Frontend',
      icon: <FiLayout />,
      technologies: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML5/CSS3', level: 95 },
        { name: 'TypeScript', level: 75 },
      ]
    },
    {
      category: 'Backend',
      icon: <FiServer />,
      technologies: [
        { name: 'Node.js', level: 90 },
        { name: 'Express', level: 88 },
        { name: 'REST APIs', level: 85 },
        { name: 'JWT', level: 80 },
      ]
    },
    {
      category: 'Bases de Datos',
      icon: <FiDatabase />,
      technologies: [
        { name: 'MySQL', level: 85 },
        { name: 'MongoDB', level: 70 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'Redis', level: 65 },
      ]
    },
    {
      category: 'Herramientas',
      icon: <FiCode />,
      technologies: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'Jest', level: 75 },
        { name: 'AWS', level: 65 },
      ]
    }
  ]

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Habilidades Técnicas</h2>
          <p className="section-subtitle">
            Tecnologías y herramientas que utilizo para crear aplicaciones modernas y escalables.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="skill-category"
            >
              <div className="skill-header">
                <div className="skill-icon">
                  {skillCategory.icon}
                </div>
                <h3 className="skill-title">{skillCategory.category}</h3>
              </div>

              <div className="skill-list">
                {skillCategory.technologies.map((tech) => (
                  <div key={tech.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{tech.name}</span>
                      <span className="skill-level">{tech.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

<style jsx>{`
        .skills-section {
          background: var(--bg-primary);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .skill-category {
          background: var(--bg-secondary);
          border-radius: var(--border-radius);
          padding: 30px;
          transition: var(--transition);
          border: 1px solid var(--border-color);
        }

        .skill-category:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow);
          border-color: var(--primary);
        }

        .skill-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .skill-icon {
          width: 50px;
          height: 50px;
          background: var(--primary);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .skill-title {
          font-size: 1.3rem;
          color: var(--text-primary);
        }

        .skill-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .skill-item {
          width: 100%;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .skill-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .skill-level {
          color: var(--primary);
          font-weight: 600;
        }

        .skill-bar {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}

export default Skills