import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiJest,
} from 'react-icons/si'

const COPIES = 3

const technologies = [
  { name: 'React',      icon: SiReact,      color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript,  color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript,  color: '#3178C6' },
  { name: 'HTML5',      icon: SiHtml5,       color: '#E34F26' },
  { name: 'CSS3',       icon: SiCss3,        color: '#1572B6' },
  { name: 'Node.js',    icon: SiNodedotjs,   color: '#339933' },
  { name: 'Express',    icon: SiExpress,     color: 'var(--text-primary)' },
  { name: 'MongoDB',    icon: SiMongodb,     color: '#47A248' },
  { name: 'MySQL',      icon: SiMysql,       color: '#4479A1' },
  { name: 'PostgreSQL', icon: SiPostgresql,  color: '#4169E1' },
  { name: 'Docker',     icon: SiDocker,      color: '#2496ED' },
  { name: 'Git',        icon: SiGit,         color: '#F05032' },
  { name: 'GitHub',     icon: SiGithub,      color: 'var(--text-primary)' },
  { name: 'Jest',       icon: SiJest,        color: '#C21325' },
]

const MarqueeItem = ({ name, icon: Icon, color }) => (
  <div className="marquee-item" aria-label={name}>
    <Icon className="marquee-icon" style={{ color }} />
  </div>
)

const Skills = () => {
  const items = technologies.map((tech) => (
    <MarqueeItem key={tech.name} {...tech} />
  ))

  return (
    <section className="skills-marquee">
      <div className="marquee-fade-left" />
      <div className="marquee-fade-right" />
      <div className="marquee-track" style={{ '--copies': COPIES }}>
        {Array.from({ length: COPIES }, (_, i) => (
          <div
            key={i}
            className="marquee-content"
            aria-hidden={i > 0}
          >
            {items}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
