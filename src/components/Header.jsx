import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiCode, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: 'Inicio', href: '#home' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Contacto', href: '#contact' },
  ]

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <nav className="nav">
          <a href="#home" className="logo">
            <FiCode size={24} />
            <span>Michael</span>
          </a>

          <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.span>
              </a>
            ))}
            
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            >
              {theme === 'light' ? (
                <FiMoon size={20} />
              ) : (
                <FiSun size={20} />
              )}
            </button>
            
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contáctame
            </a>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 20px 0;
          transition: var(--transition);
          background: transparent;
          backdrop-filter: blur(10px);
        }

        .header.scrolled {
          background: var(--bg-primary);
          opacity: 0.98;
          box-shadow: var(--shadow);
          padding: 15px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          position: relative;
          padding: 5px 0;
          transition: var(--transition);
        }

        .nav-link:hover {
          color: var(--primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .theme-toggle {
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          color: var(--text-primary);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          margin: 0 10px;
        }

        .theme-toggle:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: rotate(15deg);
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--bg-primary);
            flex-direction: column;
            padding: 30px 20px;
            gap: 25px;
            box-shadow: var(--shadow);
            border-bottom: 1px solid var(--border-color);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: var(--transition);
          }

          .nav-menu.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .theme-toggle {
            margin: 10px 0;
          }
        }

        @media (min-width: 769px) {
          .nav-menu {
            display: flex !important;
          }
        }
      `}</style>
    </motion.header>
  )
}

export default Header