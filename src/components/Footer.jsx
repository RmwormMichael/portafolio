import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi'

const Footer = () => {
  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/tuusuario', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/tuusuario', label: 'LinkedIn' },
    { icon: <FiTwitter />, href: 'https://twitter.com/tuusuario', label: 'Twitter' },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="footer-main"
          >
            <div className="footer-info">
              <h3 className="footer-logo">Michael Rubiano</h3>
              <p className="footer-description">
                Desarrollador FullStack especializado en crear aplicaciones web modernas y eficientes.
              </p>
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
            </div>

            <div className="footer-links">
              <div className="link-group">
                <h4 className="link-group-title">Navegación</h4>
                <a href="#home" className="footer-link">Inicio</a>
                <a href="#projects" className="footer-link">Proyectos</a>
                <a href="#skills" className="footer-link">Habilidades</a>
                <a href="#contact" className="footer-link">Contacto</a>
              </div>

              <div className="link-group">
                <h4 className="link-group-title">Tecnologías</h4>
                <span className="footer-link">React</span>
                <span className="footer-link">Node.js</span>
                <span className="footer-link">Express</span>
                <span className="footer-link">MySQL</span>
              </div>
            </div>
          </motion.div>

          <div className="footer-bottom">
            <p className="copyright">
              © {currentYear} Michael Rubiano. Hecho con <FiHeart className="heart-icon" /> en Colombia.
            </p>
          </div>
        </div>
      </div>

<style jsx>{`
        .footer {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          padding: 60px 0 30px;
          border-top: 1px solid var(--border-color);
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 60px;
        }

        .footer-info {
          max-width: 400px;
        }

        .footer-logo {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: var(--text-primary);
          font-family: 'Space Grotesk', sans-serif;
        }

        .footer-description {
          color: var(--text-secondary);
          margin-bottom: 25px;
          line-height: 1.7;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-secondary);
          color: var(--text-primary);
          transition: var(--transition);
          font-size: 1rem;
          border: 1px solid var(--border-color);
        }

        .social-link:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: translateY(-3px);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }

        .link-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .link-group-title {
          font-size: 1.1rem;
          margin-bottom: 10px;
          color: var(--text-primary);
        }

        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition);
          cursor: pointer;
        }

        .footer-link:hover {
          color: var(--primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 30px;
          text-align: center;
        }

        .copyright {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .heart-icon {
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer