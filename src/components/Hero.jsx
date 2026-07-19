import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ParticlesProvider, Particles } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const PARTICLE_CONFIG = {
  particles: {
    number: { value: 38 },
    shape: { type: 'circle' },
    size: { value: { min: 2, max: 4 } },
    move: { enable: true, speed: 0.6, outModes: { default: 'out' } },
    opacity: { value: { min: 0.4, max: 0.7 } },
    links: { enable: true, distance: 190, opacity: 0.35, width: 2 },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'grab' } },
    modes: { grab: { distance: 140, links: { opacity: 0.5 } } },
  },
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: { value: 22 },
          move: { speed: 0.4 },
          links: { distance: 150, opacity: 0.25 },
        },
      },
    },
  ],
}

const THEME_COLORS = {
  light: { particle: '#1e293b', link: '#0f172a' },
  dark: { particle: '#64748b', link: '#475569' },
}

const HeroContent = () => {
  const { theme } = useTheme()

  const options = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 60,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    detectRetina: true,
    background: { color: '' },
    particles: {
      ...PARTICLE_CONFIG.particles,
      paint: { color: { value: THEME_COLORS[theme].particle } },
      links: {
        ...PARTICLE_CONFIG.particles.links,
        color: THEME_COLORS[theme].link,
      },
    },
    interactivity: PARTICLE_CONFIG.interactivity,
    responsive: PARTICLE_CONFIG.responsive,
  }), [theme])

  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/RmwormMichael', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/michael-rubiano-3995781a3/', label: 'LinkedIn' },
    { icon: <FiMail />, href: 'rmworm18@gmail.com', label: 'Email' },
  ]

  return (
    <section id="home" className="section hero-section">
      <Particles
        id="hero-particles"
        className="hero-particles"
        options={options}
      />

      <div className="container hero-content-wrapper">
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
    </section>
  )
}

const initParticles = async (engine) => {
  await loadSlim(engine)
}

const Hero = () => (
  <ParticlesProvider init={initParticles}>
    <HeroContent />
  </ParticlesProvider>
)

export default Hero
