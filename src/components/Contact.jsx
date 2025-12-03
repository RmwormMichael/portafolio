import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    alert('¡Mensaje enviado! Te contactaré pronto.')
  }

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email',
      value: 'rmworm18@gmail.com',
      href: 'mailto:michael.rubiano@example.com'
    },
    {
      icon: <FiPhone />,
      title: 'Teléfono',
      value: '+57 314 798 43 66',
      href: 'tel:+573147984366'
    },
    {
      icon: <FiMapPin />,
      title: 'Ubicación',
      value: 'Bogotá, Colombia'
    }
  ]

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="contact-header"
        >
          <h2 className="section-title">Contáctame</h2>
          <p className="section-subtitle">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a hacerlo realidad.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="contact-info"
          >
            {contactInfo.map((info) => (
              <div key={info.title} className="contact-item">
                <div className="contact-icon">
                  {info.icon}
                </div>
                <div>
                  <h4 className="contact-item-title">{info.title}</h4>
                  {info.href ? (
                    <a href={info.href} className="contact-item-value">
                      {info.value}
                    </a>
                  ) : (
                    <p className="contact-item-value">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="¿En qué puedo ayudarte?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Describe tu proyecto o consulta..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar Mensaje
              <FiSend />
            </button>
          </motion.form>
        </div>
      </div>

 <style jsx>{`
        .contact-section {
          background: var(--bg-secondary);
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          margin-top: 40px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          background: var(--primary);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .contact-item-title {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: var(--text-primary);
        }

        .contact-item-value {
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition);
        }

        .contact-item-value:hover {
          color: var(--primary);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 500;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .form-group input,
        .form-group textarea {
          padding: 12px 16px;
          border: 2px solid var(--border-color);
          border-radius: var(--border-radius);
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          transition: var(--transition);
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--text-muted);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        @media (max-width: 992px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact