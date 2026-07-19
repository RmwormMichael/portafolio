// ============================================
// AUDITORÍA SCROLLTRIGGER MÓVIL
// Solo timing — sin cambios al CSS
// ============================================

;(function () {
  console.clear()
  console.log('========== AUDITORÍA SCROLLTRIGGER MÓVIL ==========')
  console.log('')

  const section = document.querySelector('.contact-section')
  if (!section) { console.log('ERROR: .contact-section no encontrado'); return }

  // --- 1. DATOS BASE ---
  const viewportH = window.innerHeight
  const sectionTop = Math.round(section.getBoundingClientRect().top + window.scrollY)
  const sectionH = section.offsetHeight
  const sectionBottom = sectionTop + sectionH

  console.log('=== 1. GEOMETRÍA ===')
  console.log(`viewport:          ${window.innerWidth}×${viewportH}px`)
  console.log(`section top (doc): ${sectionTop}px`)
  console.log(`section height:    ${sectionH}px (= ${Math.round(sectionH / viewportH * 100)}vh)`)
  console.log(`section bottom:    ${sectionBottom}px`)
  console.log('')

  // --- 2. BUSCAR TIMELINE CON SCROLLTRIGGER ---
  let mainTL = null
  const allTweens = gsap.globalTimeline.getChildren(true, true, true)
  console.log(`=== 2. GSAP GLOBAL ===`)
  console.log(`Tweens globales: ${allTweens.length}`)

  allTweens.forEach((t, i) => {
    if (t instanceof gsap.core.Timeline && t.scrollTrigger) {
      mainTL = t
      console.log(`Timeline[${i}] con ScrollTrigger encontrada`)
    }
  })

  if (!mainTL) {
    console.log('No se encontró timeline con ScrollTrigger')
    console.log('========== FIN ==========')
    return
  }

  // --- 3. SCROLLTRIGGER ---
  const st = mainTL.scrollTrigger
  const scrollRange = st.end - st.start
  const totalDur = mainTL.totalDuration()

  console.log('')
  console.log('=== 3. SCROLLTRIGGER ===')
  console.log(`trigger:          .contact-section`)
  console.log(`vars.start:       "${st.vars.start}"`)
  console.log(`vars.end:         "${st.vars.end}"`)
  console.log(`start (px):       ${st.start}px (scrollY donde activa)`)
  console.log(`end (px):         ${st.end}px (scrollY donde termina)`)
  console.log(`recorrido:        ${scrollRange}px`)
  console.log(`pin:              ${st.pin ? 'SÍ' : 'NO'}`)
  console.log(`scrub:            ${st.vars.scrub}`)
  console.log(`isActive:         ${st.isActive}`)
  console.log('')

  // --- 4. TRADUCCIÓN: QUÉ SIGNIFICA START/END ---
  console.log('=== 4. QUÉ SIGNIFICAN START/END ===')
  console.log(`start=${st.start}px:`)
  console.log(`  → section top está en: ${sectionTop}px (desde doc top)`)
  console.log(`  → para que sectionTop - scrollY = 0:`)
  console.log(`  → scrollY = ${sectionTop}px`)
  console.log(`  → ScrollTrigger.start (${st.start}px) = sectionTop (${sectionTop}px)? ${st.start === sectionTop ? 'SÍ ✓' : 'NO — diff=' + (st.start - sectionTop) + 'px'}`)
  console.log('')
  console.log(`end=${st.end}px:`)
  console.log(`  → section bottom - viewport = sectionBottom - viewportH = ${sectionBottom} - ${viewportH} = ${sectionBottom - viewportH}px`)
  console.log(`  → ScrollTrigger.end (${st.end}px) = ${sectionBottom - viewportH}px? ${st.end === sectionBottom - viewportH ? 'SÍ ✓' : 'NO — diff=' + (st.end - (sectionBottom - viewportH)) + 'px'}`)
  console.log('')

  // --- 5. MILESTONES DE SCROLL ---
  console.log('=== 5. MILESTONES DE SCROLL ===')
  console.log('')

  const milestones = [
    { name: 'Contact ENTRA al viewport (top toca bottom)', scrollY: sectionTop - viewportH },
    { name: 'Contact cubre 50% del viewport', scrollY: sectionTop - viewportH / 2 },
    { name: 'Contact top = viewport top (start del ST)', scrollY: st.start },
    { name: 'Contact cubre 100% del viewport', scrollY: sectionTop },
    { name: 'Contact bottom = viewport bottom (end del ST)', scrollY: st.end },
    { name: 'Contact SALE del viewport (bottom toca top)', scrollY: sectionBottom },
  ]

  milestones.forEach(m => {
    const scrollRatio = scrollRange > 0 ? Math.max(0, Math.min(1, (m.scrollY - st.start) / scrollRange)) : 0
    const tlProgress = scrollRatio

    let marker = ''
    if (m.scrollY < st.start) marker = ' ← ANTES del start (timeline en 0%)'
    else if (m.scrollY > st.end) marker = ' ← DESPUÉS del end (timeline en 100%)'
    else marker = ` ← timeline en ${(tlProgress * 100).toFixed(1)}%`

    console.log(`scrollY: ${Math.round(m.scrollY)}px`)
    console.log(`  ${m.name}`)
    console.log(`  timeline progress: ${(tlProgress * 100).toFixed(1)}%${marker}`)
    console.log('')
  })

  // --- 6. DIAGNÓSTICO DEL PROBLEMA ---
  console.log('=== 6. DIAGNÓSTICO ===')
  console.log('')

  const visibleStart = sectionTop - viewportH
  const animStart = st.start

  if (animStart <= visibleStart) {
    console.log(`⚠ START (${animStart}px) ≤ visibleStart (${visibleStart}px)`)
    console.log('  → La animación EMPIEZA antes de que Contact sea visible')
    console.log('  → Cuando Contact entra al viewport, el timeline YA está avanzado')
    console.log('  → El usuario ve la animación parcialmente reproducida')
  } else {
    console.log(`✓ START (${animStart}px) > visibleStart (${visibleStart}px)`)
    console.log(`  → La animación empieza ${animStart - visibleStart}px DESPUÉS de que Contact entra al viewport`)
    console.log(`  → Cuando Contact entra, el timeline está en 0%`)
  }

  console.log('')

  // Duración relativa
  const usableScroll = scrollRange
  const timelinePx = usableScroll
  console.log(`Recorrido scroll: ${usableScroll}px`)
  console.log(`Duración timeline: ${totalDur}`)
  console.log(`1% del timeline = ${(totalDur * 100).toFixed(0)}% del scroll = ${(usableScroll / 100).toFixed(1)}px`)

  console.log('')

  // Cada tween
  const children = mainTL.getChildren(false, false, true)
  let acc = 0
  console.log('=== 7. DISTRIBUCIÓN DE TWEENS ===')
  children.forEach((child, i) => {
    const startPct = (acc / totalDur * 100).toFixed(1)
    const dur = child.duration()
    const endPct = ((acc + dur) / totalDur * 100).toFixed(1)
    const startPx = (acc / totalDur * usableScroll).toFixed(0)
    const endPx = ((acc + dur) / totalDur * usableScroll).toFixed(0)

    const targets = child.targets?.() || []
    const cls = targets[0]?.className?.toString?.().split(' ')[0] || targets[0]?.tagName || '?'

    console.log(`[${i}] .${cls}`)
    console.log(`    duración: ${dur.toFixed(4)} (${startPct}% → ${endPct}%)`)
    console.log(`    scroll:   ${startPx}px → ${endPx}px`)
    console.log(`    pixels:   ${(dur / totalDur * usableScroll).toFixed(0)}px de scroll`)
    acc += dur
  })

  console.log('========== FIN ==========')
})()
