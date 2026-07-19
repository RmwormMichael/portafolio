// ============================================
// INSPECCIÓN COMPLETA v2 — Sticky + ScrollTrigger + Timeline
// Contact Section — Mobile
// ============================================

console.clear()
console.log('========== INSPECCIÓN COMPLETA CONTACT v2 ==========')
console.log('')

const contactSection = document.querySelector('.contact-section')
const contactPin = document.querySelector('.contact-pin')

if (!contactSection || !contactPin) {
  console.log('ERROR: .contact-section o .contact-pin no encontrado')
} else {

  // =============================================
  // 1. DOM
  // =============================================
  console.log('========== 1. DOM ==========')
  const sectionRect = contactSection.getBoundingClientRect()
  const pinRect = contactPin.getBoundingClientRect()
  const cs = getComputedStyle(contactSection)
  const ps = getComputedStyle(contactPin)
  const viewportH = window.innerHeight

  console.log('.contact-section:')
  console.log(`  offsetWidth: ${contactSection.offsetWidth}px`)
  console.log(`  offsetHeight: ${contactSection.offsetHeight}px (= ${Math.round(contactSection.offsetHeight / viewportH * 100)}% de viewport)`)
  console.log(`  scrollWidth: ${contactSection.scrollWidth}px`)
  console.log(`  getBoundingClientRect: top=${Math.round(sectionRect.top)} bottom=${Math.round(sectionRect.bottom)} height=${Math.round(sectionRect.height)}`)
  console.log(`  height CSS: ${cs.height}`)
  console.log(`  overflow: ${cs.overflow}`)
  console.log('')

  console.log('.contact-pin:')
  console.log(`  offsetWidth: ${contactPin.offsetWidth}px`)
  console.log(`  offsetHeight: ${contactPin.offsetHeight}px (= ${Math.round(contactPin.offsetHeight / viewportH * 100)}% de viewport)`)
  console.log(`  getBoundingClientRect: top=${Math.round(pinRect.top)} bottom=${Math.round(pinRect.bottom)}`)
  console.log(`  position: ${ps.position}, top: ${ps.top}`)
  console.log('')

  console.log(`viewport: ${window.innerWidth}x${viewportH}`)
  console.log(`scrollY actual: ${window.scrollY}`)
  console.log('')

  // =============================================
  // 2. BUSCAR SCROLLTRIGGER Y TIMELINE POR GSAP
  // =============================================
  console.log('========== 2. GSAP INTERNO ==========')

  // Buscar todos los tweens del contact section
  const allTweens = gsap.getTweensOf(contactSection, true)
  console.log(`Tweens directos en .contact-section: ${allTweens.length}`)

  // Buscar tweens de hijos
  const charTweens = gsap.getTweensOf(contactSection.querySelectorAll('.contact-char'), true)
  const wordTweens = gsap.getTweensOf(contactSection.querySelectorAll('.contact-word'), true)
  console.log(`Tweens en .contact-char: ${charTweens.length}`)
  console.log(`Tweens en .contact-word: ${wordTweens.length}`)
  console.log('')

  // Encontrar la timeline principal con ScrollTrigger
  let mainTL = null
  const allFound = new Set()

  function collectTweens(el) {
    if (!el) return
    const tweens = gsap.getTweensOf(el, true)
    tweens.forEach(t => {
      let root = t
      while (root.parent && root.parent !== gsap.globalTimeline) {
        root = root.parent
      }
      if (!allFound.has(root)) {
        allFound.add(root)
        if (root instanceof gsap.core.Timeline && root.scrollTrigger) {
          mainTL = root
        }
      }
    })
  }

  collectTweens(contactSection)
  contactSection.querySelectorAll('*').forEach(el => collectTweens(el))

  console.log(`Timelines encontradas: ${allFound.size}`)

  if (mainTL) {
    const st = mainTL.scrollTrigger
    const totalDur = mainTL.totalDuration()

    console.log('')
    console.log('--- ScrollTrigger ---')
    console.log(`  vars.start: ${st.vars?.start}`)
    console.log(`  vars.end: ${st.vars?.end}`)
    console.log(`  start (px): ${st.start}`)
    console.log(`  end (px): ${st.end}`)
    console.log(`  recorrido: ${st.end - st.start}px`)
    console.log(`  progress: ${st.progress?.toFixed(4)}`)
    console.log(`  isActive: ${st.isActive}`)
    console.log(`  pin: ${st.pin?.className?.split(' ')[0] || 'none'}`)
    console.log(`  pinSpacing: ${st.pinSpacing}`)
    console.log(`  scrub: ${st.scrub}`)
    console.log('')

    console.log('--- Timeline ---')
    console.log(`  totalDuration: ${totalDur}`)
    console.log(`  progress: ${mainTL.progress?.toFixed(4)}`)
    console.log(`  reversed: ${mainTL.reversed()}`)
    console.log(`  paused: ${mainTL.paused()}`)
    console.log('')

    // Children
    const children = mainTL.getChildren(false, false, true)
    console.log(`  Children: ${children.length}`)
    console.log('')

    console.log('--- Detalle de cada Tween ---')
    let acc = 0
    const tweenData = []

    children.forEach((child, i) => {
      const targets = child.targets?.() || []
      const firstTarget = targets[0]
      const cls = firstTarget?.className?.toString?.() || firstTarget?.tagName || '?'
      const start = acc
      const end = acc + child.duration()

      const fromVars = {}
      if (child.vars) {
        ;['x', 'y', 'opacity', 'rotation', 'stagger', 'duration', 'ease'].forEach(k => {
          if (child.vars[k] !== undefined) fromVars[k] = child.vars[k]
        })
      }

      console.log(`  [${i}] ${child.constructor.name}`)
      console.log(`      target: .${cls.split(' ')[0]}`)
      console.log(`      startTime: ${start.toFixed(4)}`)
      console.log(`      endTime: ${end.toFixed(4)}`)
      console.log(`      duration: ${child.duration().toFixed(4)}`)
      console.log(`      range: ${(start / totalDur * 100).toFixed(1)}% → ${(end / totalDur * 100).toFixed(1)}%`)
      console.log(`      vars: ${JSON.stringify(fromVars)}`)
      console.log('')

      tweenData.push({ start, end, cls })
      acc = end
    })

    // Gaps
    console.log('--- Gaps y Espacio Muerto ---')
    for (let i = 1; i < tweenData.length; i++) {
      const gap = tweenData[i].start - tweenData[i - 1].end
      if (gap > 0.001) {
        console.log(`  GAP [${i - 1}]→[${i}]: ${gap.toFixed(4)} = ${(gap / totalDur * (st.end - st.start)).toFixed(0)}px`)
      }
    }

    const lastEnd = tweenData[tweenData.length - 1]?.end || 0
    const remaining = totalDur - lastEnd
    const scrollRange = st.end - st.start
    const remainingPx = remaining / totalDur * scrollRange

    console.log(`  Último tween termina: ${(lastEnd / totalDur * 100).toFixed(1)}%`)
    console.log(`  Timeline total: 100%`)
    console.log(`  Espacio muerto: ${(remaining / totalDur * 100).toFixed(1)}% = ${remainingPx.toFixed(0)}px`)
    console.log('')

    // Título vs subtítulo
    console.log('--- Título vs Subtítulo ---')
    let titleData = null
    let subtitleData = null

    tweenData.forEach(td => {
      if (td.cls.includes('char') || td.cls.includes('title')) {
        titleData = td
      }
      if (td.cls.includes('word') || td.cls.includes('subtitle')) {
        subtitleData = td
      }
    })

    if (titleData) {
      console.log(`  Título: ${(titleData.start / totalDur * 100).toFixed(1)}% → ${(titleData.end / totalDur * 100).toFixed(1)}%`)
      console.log(`    = ${(titleData.end / totalDur * scrollRange).toFixed(0)}px de scroll`)
    }
    if (subtitleData) {
      console.log(`  Subtítulo: ${(subtitleData.start / totalDur * 100).toFixed(1)}% → ${(subtitleData.end / totalDur * 100).toFixed(1)}%`)
      console.log(`    = ${(subtitleData.end / totalDur * scrollRange).toFixed(0)}px de scroll`)
    }
    console.log(`  Gap entre ellos: ${tweenData.length >= 2 ? ((tweenData[1].start - tweenData[0].end) / totalDur * 100).toFixed(1) + '%' : 'N/A'}`)
    console.log('')

    // =============================================
    // 3. STICKY
    // =============================================
    console.log('========== 3. STICKY ==========')
    const sectionTop = Math.round(sectionRect.top + window.scrollY)
    const sectionH = contactSection.offsetHeight
    const pinH = contactPin.offsetHeight

    const stickyStart = sectionTop
    const stickyEnd = sectionTop + sectionH - pinH

    console.log(`  .contact-section top (doc): ${sectionTop}px`)
    console.log(`  .contact-section height: ${sectionH}px`)
    console.log(`  .contact-pin height: ${pinH}px`)
    console.log(`  sticky inicia en scroll: ${stickyStart}px`)
    console.log(`  sticky termina en scroll: ${stickyEnd}px`)
    console.log(`  sticky activo durante: ${stickyEnd - stickyStart}px = ${((stickyEnd - stickyStart) / viewportH).toFixed(1)}vh`)
    console.log(`  pinRect.top actual: ${Math.round(pinRect.top)} (0 = sticky activo)`)
    console.log(`  sticky activo AHORA: ${Math.round(pinRect.top) === 0 ? 'SÍ' : 'NO'}`)
    console.log('')

    // =============================================
    // 4. RESUMEN FINAL
    // =============================================
    console.log('========== 4. RESUMEN ==========')
    console.log('')
    console.log('Dato                         | Valor')
    console.log('-----------------------------|--------')
    console.log(`viewport                     | ${window.innerWidth}x${viewportH}`)
    console.log(`section height               | ${sectionH}px = ${Math.round(sectionH / viewportH * 100)}vh`)
    console.log(`pin height                   | ${pinH}px = ${Math.round(pinH / viewportH * 100)}vh`)
    console.log(`section top (doc)            | ${sectionTop}px`)
    console.log(`ScrollTrigger.start          | ${st.start}px`)
    console.log(`ScrollTrigger.end            | ${st.end}px`)
    console.log(`ScrollTrigger.recorrido      | ${scrollRange}px`)
    console.log(`sticky.inicio                | ${stickyStart}px`)
    console.log(`sticky.fin                   | ${stickyEnd}px`)
    console.log(`sticky.recorrido             | ${stickyEnd - stickyStart}px`)
    console.log(`timeline.totalDuration       | ${totalDur}`)
    console.log(`timeline.usa                 | ${(lastEnd / totalDur * 100).toFixed(1)}%`)
    console.log(`timeline.NO usa              | ${(remaining / totalDur * 100).toFixed(1)}% = ${remainingPx.toFixed(0)}px`)
    console.log(`scrollY actual               | ${window.scrollY}px`)
    console.log('')

    console.log('DIAGNÓSTICO:')
    console.log(`  section height (${sectionH}px) = sticky range (${stickyEnd - stickyStart}px) + pin height (${pinH}px)? ${sectionH === (stickyEnd - stickyStart) + pinH ? 'SÍ' : 'NO'}`)
    console.log(`  ScrollTrigger.recorrido (${scrollRange}px) = sticky.recorrido (${stickyEnd - stickyStart}px)? ${scrollRange === (stickyEnd - stickyStart) ? 'SÍ' : 'NO'}`)
    console.log(`  Timeline usa todo el ScrollTrigger? ${remainingPx < 1 ? 'SÍ' : 'NO — sobran ' + remainingPx.toFixed(0) + 'px'}`)
    console.log(`  Espacio muerto pertenece a: ${remainingPx > 10 ? 'TIMELINE (no tiene tweens para ese tramo)' : 'NO HAY ESPACIO MUERTO'}`)
  } else {
    console.log('No se encontró timeline con ScrollTrigger')
    console.log('Timelines encontradas:')
    allFound.forEach((tl, i) => {
      console.log(`  [${i}] duration=${tl.duration()} scrollTrigger=${tl.scrollTrigger ? 'SÍ' : 'NO'}`)
    })
  }

  console.log('')
  console.log('========== FIN ==========')
}
