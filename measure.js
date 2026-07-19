// ============================================
// SCRIPT DE MEDICIÓN — Ejecutar en consola del navegador
// Abrir DevTools > Consola > Pegar todo esto > Enter
// ============================================

console.clear()
console.log('========== AUDITORÍA DE LAYOUT ==========')
console.log('')

// 1. Medidas globales
const docEl = document.documentElement
console.log('--- GLOBAL ---')
console.log('window.innerWidth:', window.innerWidth)
console.log('window.innerHeight:', window.innerHeight)
console.log('document.documentElement.scrollWidth:', docEl.scrollWidth)
console.log('document.documentElement.scrollHeight:', docEl.scrollHeight)
console.log('document.body.scrollWidth:', document.body.scrollWidth)
console.log('¿scrollWidth > innerWidth?', docEl.scrollWidth > window.innerWidth)
console.log('Diferencia:', docEl.scrollWidth - window.innerWidth, 'px')
console.log('')

// 2. Medidas por sección
const sections = [
  { name: 'Hero', el: document.querySelector('.hero-section') },
  { name: 'Skills', el: document.querySelector('.skills-marquee') },
  { name: 'Projects', el: document.querySelector('.projects-section') || document.querySelector('#projects') },
  { name: 'Contact', el: document.querySelector('.contact-section') },
  { name: 'Footer', el: document.querySelector('.footer') },
  { name: 'Header', el: document.querySelector('.header') || document.querySelector('header') },
]

console.log('--- SECCIONES ---')
sections.forEach(({ name, el }) => {
  if (!el) {
    console.log(`${name}: NO ENCONTRADO`)
    return
  }
  const rect = el.getBoundingClientRect()
  const cs = getComputedStyle(el)
  console.log(`${name}:`)
  console.log(`  offsetWidth: ${el.offsetWidth}px`)
  console.log(`  scrollWidth: ${el.scrollWidth}px`)
  console.log(`  getBoundingClientRect: left=${Math.round(rect.left)} right=${Math.round(rect.right)} width=${Math.round(rect.width)}`)
  console.log(`  overflow: ${cs.overflow} / overflow-x: ${cs.overflowX}`)
  console.log(`  position: ${cs.position}`)
  console.log('')
})

// 3. Medidas específicas de Contact
console.log('--- CONTACT DETALLE ---')
const contactEls = [
  { name: '.contact-section', sel: '.contact-section' },
  { name: '.contact-pin', sel: '.contact-pin' },
  { name: '.contact-title', sel: '.contact-title' },
  { name: '.contact-subtitle', sel: '.contact-subtitle' },
]

contactEls.forEach(({ name, sel }) => {
  const el = document.querySelector(sel)
  if (!el) {
    console.log(`${name}: NO ENCONTRADO`)
    return
  }
  const rect = el.getBoundingClientRect()
  const cs = getComputedStyle(el)
  console.log(`${name}:`)
  console.log(`  offsetWidth: ${el.offsetWidth}px`)
  console.log(`  scrollWidth: ${el.scrollWidth}px`)
  console.log(`  left: ${Math.round(rect.left)}px`)
  console.log(`  right: ${Math.round(rect.right)}px`)
  console.log(`  width: ${Math.round(rect.width)}px`)
  console.log(`  transform: ${cs.transform}`)
  console.log(`  position: ${cs.position}`)
  console.log(`  overflow: ${cs.overflow}`)
  console.log('')
})

// 4. Todas las .contact-word
console.log('--- CONTACT-WORD (todas) ---')
const words = document.querySelectorAll('.contact-word')
console.log(`Total words: ${words.length}`)
words.forEach((el, i) => {
  const rect = el.getBoundingClientRect()
  const cs = getComputedStyle(el)
  const exceedsRight = rect.right > window.innerWidth
  console.log(`  [${i}] "${el.textContent.trim()}" | right=${Math.round(rect.right)}px ${exceedsRight ? '⚠️ EXCEDE VIEWPORT' : '✓'} | transform: ${cs.transform}`)
})
console.log('')

// 5. Todas las .contact-char
console.log('--- CONTACT-CHAR (todas) ---')
const chars = document.querySelectorAll('.contact-char')
console.log(`Total chars: ${chars.length}`)
chars.forEach((el, i) => {
  const rect = el.getBoundingClientRect()
  const cs = getComputedStyle(el)
  const exceedsRight = rect.right > window.innerWidth
  if (exceedsRight) {
    console.log(`  [${i}] "${el.textContent}" | right=${Math.round(rect.right)}px ⚠️ EXCEDE | transform: ${cs.transform}`)
  }
})
console.log('')

// 6. Elementos con transform
console.log('--- ELEMENTOS CON TRANSFORM (fuera de Contact) ---')
document.querySelectorAll('*').forEach(el => {
  const cs = getComputedStyle(el)
  if (cs.transform && cs.transform !== 'none' && !el.closest('.contact-section')) {
    const rect = el.getBoundingClientRect()
    if (rect.right > window.innerWidth || rect.left < 0) {
      console.log(`  ${el.tagName}.${el.className.split(' ')[0]} | right=${Math.round(rect.right)} left=${Math.round(rect.left)} | transform: ${cs.transform}`)
    }
  }
})
console.log('')

// 7. Buscar el elemento más ancho
console.log('--- ELEMENTO MÁS ANCHO ---')
let maxEl = null
let maxWidth = 0
document.querySelectorAll('*').forEach(el => {
  if (el.offsetWidth > maxWidth) {
    maxWidth = el.offsetWidth
    maxEl = el
  }
})
if (maxEl) {
  console.log(`Mayor width: ${maxEl.tagName}.${maxEl.className.split(' ')[0]} = ${maxWidth}px`)
}
console.log('')

// 8. Buscar todos los elementos que exceden el viewport
console.log('--- ELEMENTOS QUE EXCEDEN VIEWPORT (right > innerWidth) ---')
const viewportWidth = window.innerWidth
document.querySelectorAll('*').forEach(el => {
  const rect = el.getBoundingClientRect()
  if (rect.right > viewportWidth + 5) {
    console.log(`  ${el.tagName}.${el.className.toString().split(' ')[0]} | right=${Math.round(rect.right)}px | overflow=${getComputedStyle(el).overflow}`)
  }
})
console.log('')
console.log('========== FIN AUDITORÍA ==========')
