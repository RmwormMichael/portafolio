import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITLE = 'Contáctame'
const SUBTITLE_LINE_1 = '¿Tienes un proyecto en mente?'
const SUBTITLE_LINE_2 = 'Hablemos sobre cómo puedo ayudarte a hacerlo realidad.'

const splitWords = (lines) =>
  lines.map((line) =>
    line.split(' ').map((word, i, arr) => (
      <span key={`${lines.indexOf(line)}-${i}`} className="contact-word">
        {word}{i < arr.length - 1 ? '\u00A0' : ''}
      </span>
    ))
  )

const Contact = () => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    let mobileObserver

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 769px) and (prefers-reduced-motion: no-preference)': () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            },
          })

          const chars = containerRef.current.querySelectorAll('.contact-char')
          const words = containerRef.current.querySelectorAll('.contact-word')

          tl.fromTo(chars,
            {
              x: () => window.innerWidth * 0.25,
              y: (i) => (i % 2 === 0 ? -80 : 80),
              rotation: (i) => (i % 2 === 0 ? 5 : -5),
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.04,
              ease: 'power3.out',
            }
          )

          tl.to({}, { duration: 0.12 })

          tl.from(words, {
            x: () => window.innerWidth,
            y: (i) => (i % 2 === 0 ? -30 : 30),
            opacity: 0.2,
            duration: 0.3,
            stagger: 0.03,
            ease: 'power2.out',
          })
        },

        '(max-width: 768px) and (prefers-reduced-motion: no-preference)': () => {
          const chars = containerRef.current.querySelectorAll('.contact-char')
          const words = containerRef.current.querySelectorAll('.contact-word')
          const title = containerRef.current.querySelector('.contact-title')
          const section = containerRef.current

          const titleTl = gsap.fromTo(chars,
            {
              x: () => window.innerWidth,
              y: (i) => (i % 2 === 0 ? -60 : 60),
              rotation: (i) => (i % 2 === 0 ? 4 : -4),
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.03,
              ease: 'power3.out',
              paused: true,
            }
          )

          let titleVisible = false

          mobileObserver = new IntersectionObserver(
            ([entry]) => {
              titleVisible = entry.isIntersecting
              if (titleVisible) {
                titleTl.play()
              }
            },
            { threshold: 0.15 }
          )
          mobileObserver.observe(title)

          ScrollTrigger.create({
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              if (!titleVisible) return
              if (self.direction === -1) {
                titleTl.reverse()
              }
            },
          })

          const subtitleTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.8,
            },
          })

          subtitleTl.to({}, { duration: 0.4 + 0.03 * (chars.length - 1) + 0.12 })

          subtitleTl.from(words, {
            x: () => window.innerWidth,
            y: (i) => (i % 2 === 0 ? -20 : 20),
            opacity: 0.2,
            duration: 0.3,
            stagger: 0.025,
            ease: 'power2.out',
          })
        },

        '(prefers-reduced-motion: reduce)': () => {
          gsap.set(containerRef.current.querySelectorAll('.contact-char'), {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
          })
          gsap.set(containerRef.current.querySelectorAll('.contact-word'), {
            opacity: 1,
            x: 0,
            y: 0,
          })
        },
      })
    }, containerRef)

    return () => {
      mobileObserver?.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <section id="contact" className="contact-section" ref={containerRef}>
      <div className="contact-pin">
        <h2 className="contact-title">
          {TITLE.split('').map((char, i) => (
            <span key={i} className="contact-char">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        <p className="contact-subtitle">
          {splitWords([SUBTITLE_LINE_1, SUBTITLE_LINE_2]).map((lineWords, lineIndex) => (
            <span key={lineIndex}>
              {lineWords}
              {lineIndex === 0 && <br />}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default Contact
