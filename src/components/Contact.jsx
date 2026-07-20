import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
window.gsap = gsap
window.ScrollTrigger = ScrollTrigger

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
          const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.8,

    onUpdate(self) {
  const title = document.querySelector(".contact-title");
  const pin = document.querySelector(".contact-pin");

  console.table({
    progress: self.progress.toFixed(3),
    timeline: self.animation.time().toFixed(3),
    titleTop: title.getBoundingClientRect().top.toFixed(1),
    pinTop: pin.getBoundingClientRect().top.toFixed(1),
  });

  // <-- AQUÍ, inmediatamente después del console.table()
  if (title.getBoundingClientRect().top <= window.innerHeight) {
    console.log({
      progress: self.progress,
      timeline: self.animation.time(),
    });
  }
}
  },
})

          const chars = containerRef.current.querySelectorAll('.contact-char')
          const words = containerRef.current.querySelectorAll('.contact-word')

          tl.fromTo(chars,
            {
              x: () => window.innerWidth * 0.15,
              y: (i) => (i % 2 === 0 ? -60 : 60),
              rotation: (i) => (i % 2 === 0 ? 4 : -4),
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.03,
              ease: 'power3.out',
            }
          )

          tl.to({}, { duration: 0.12 })

          tl.from(words, {
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

    return () => ctx.revert()
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
