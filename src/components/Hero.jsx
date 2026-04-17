import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'

const Hero = () => {
  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/RmwormMichael', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/michael-rubiano-3995781a3/', label: 'LinkedIn' },
    { icon: <FiMail />, href: 'rmworm18@gmail.com', label: 'Email' },
  ]

  return (
    <section id="home" className="section hero-section">
      <div className="container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-text"
          >
            <span className="greeting">Hola, soy</span>
            <h1 className="hero-title">
              Michael <span className="highlight">Rubiano</span>
            </h1>
            <h2 className="hero-subtitle">Desarrollador FullStack</h2>
            <p className="hero-description">
              Técnico en Programación de Software con experiencia en desarrollo de aplicaciones web modernas.
              Especializado en Node.js, React, Express y bases de datos SQL.
              Apasionado por crear soluciones eficientes y escalables.
            </p>
            
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Contáctame
                <FiMail />
              </a>
            </div>

            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-image"
          >
            <div className="image-placeholder">
              <div className="tech-stack">
                <span className="tech-item">React</span>
                <span className="tech-item">Node.js</span>
                <span className="tech-item">Express</span>
                <span className="tech-item">MySQL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

<style jsx>{`
        .hero-section {
          padding-top: 150px;
          background: var(--bg-primary);
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .greeting {
          display: inline-block;
          color: var(--primary);
          font-weight: 500;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 10px;
          color: var(--text-primary);
        }

        .highlight {
          color: var(--primary);
          position: relative;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--text-secondary);
          margin-bottom: 30px;
          font-weight: 400;
        }

        .hero-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-primary);
          margin-bottom: 40px;
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
        }

        .social-links {
          display: flex;
          gap: 20px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          transition: var(--transition);
          font-size: 1.2rem;
        }

        .social-link:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: translateY(-3px);
        }

        .hero-image {
          position: relative;
        }

        .image-placeholder {
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: var(--border-radius);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .tech-stack {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 40px;
        }

        .tech-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: white;
          padding: 15px 25px;
          border-radius: var(--border-radius);
          font-weight: 500;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-description {
            margin: 0 auto 40px;
          }

          .hero-actions {
            justify-content: center;
          }

          .social-links {
            justify-content: center;
          }

          .hero-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 576px) {
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 300px;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero