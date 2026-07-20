// ============================================
// MEDICIÓN DE RECORRIDO — chars vs words
// Tecno Spark 10
// ============================================

;(function () {
  console.clear()
  console.log('========== MEDICIÓN CHARS VS WORDS ==========')
  console.log('')

  const section = document.querySelector('.contact-section')
  if (!section) { console.log('ERROR: .contact-section no encontrado'); return }

  // --- 1. ENCONTRAR TIMELINE ---
  let mainTL = null
  const allTweens = gsap.globalTimeline.getChildren(true, true, true)
  allTweens.forEach(t => {
    if (t instanceof gsap.core.Timeline && t.scrollTrigger) mainTL = t
  })
  if (!mainTL) { console.log('ERROR: timeline no encontrada'); return }

  const st = mainTL.scrollTrigger
  const totalDur = mainTL.totalDuration()
  const scrollRange = st.end - st.start

  // --- 2. ENCONTRAR CHARS Y WORDS TWEENS ---
  const children = mainTL.getChildren(false, true, true)
  let charsTween = null
  let wordsTween = null
  let emptyTween = null

  children.forEach(child => {
    const targets = child.targets?.() || []
    const first = targets[0]
    if (!first) return
    const cls = first.className?.toString?.() || ''
    if (cls.includes('contact-char')) charsTween = child
    else if (cls.includes('contact-word')) wordsTween = child
    else emptyTween = child
  })

  // --- 3. DATOS DEL SCROLLTRIGGER ---
  console.log('=== SCROLLTRIGGER ===')
  console.log(`start:       ${st.start}px`)
  console.log(`end:         ${st.end}px`)
  console.log(`recorrido:   ${scrollRange}px`)
  console.log(`progress:    ${st.progress?.toFixed(4)}`)
  console.log('')

  // --- 4. DATOS DE LA TIMELINE ---
  console.log('=== TIMELINE ===')
  console.log(`duration:    ${totalDur.toFixed(4)}`)
  console.log(`1% del tl =  ${(totalDur / 100).toFixed(6)}`)
  console.log(`1% del scroll = ${(scrollRange / 100).toFixed(2)}px`)
  console.log('')

  // --- 5. CHARS TWEEN ---
  if (charsTween) {
    const cStart = charsTween.startTime()
    const cEnd = cStart + charsTween.duration()
    const cStartPx = (cStart / totalDur) * scrollRange
    const cEndPx = (cEnd / totalDur) * scrollRange
    const cPx = cEndPx - cStartPx

    console.log('=== CHARS TWEEN ===')
    console.log(`startTime:     ${cStart.toFixed(4)}`)
    console.log(`endTime:       ${cEnd.toFixed(4)}`)
    console.log(`duration:      ${charsTween.duration().toFixed(4)}`)
    console.log(`% del timeline: ${(charsTween.duration() / totalDur * 100).toFixed(1)}%`)
    console.log(`startPx (scroll): ${cStartPx.toFixed(1)}px`)
    console.log(`endPx (scroll):   ${cEndPx.toFixed(1)}px`)
    console.log(`RECORRIDO TOTAL:  ${cPx.toFixed(1)}px`)
    console.log('')
  } else {
    console.log('=== CHARS TWEEN ===')
    console.log('NO ENCONTRADO')
    console.log('')
  }

  // --- 6. EMPTY TWEEN (gap) ---
  if (emptyTween) {
    const eStart = emptyTween.startTime()
    const eEnd = eStart + emptyTween.duration()
    const eStartPx = (eStart / totalDur) * scrollRange
    const eEndPx = (eEnd / totalDur) * scrollRange
    const ePx = eEndPx - eStartPx

    console.log('=== EMPTY TWEEN (gap) ===')
    console.log(`startTime:     ${eStart.toFixed(4)}`)
    console.log(`endTime:       ${eEnd.toFixed(4)}`)
    console.log(`duration:      ${emptyTween.duration().toFixed(4)}`)
    console.log(`startPx:       ${eStartPx.toFixed(1)}px`)
    console.log(`endPx:         ${eEndPx.toFixed(1)}px`)
    console.log(`RECORRIDO:     ${ePx.toFixed(1)}px`)
    console.log('')
  }

  // --- 7. WORDS TWEEN ---
  if (wordsTween) {
    const wStart = wordsTween.startTime()
    const wEnd = wStart + wordsTween.duration()
    const wStartPx = (wStart / totalDur) * scrollRange
    const wEndPx = (wEnd / totalDur) * scrollRange
    const wPx = wEndPx - wStartPx

    console.log('=== WORDS TWEEN ===')
    console.log(`startTime:     ${wStart.toFixed(4)}`)
    console.log(`endTime:       ${wEnd.toFixed(4)}`)
    console.log(`duration:      ${wordsTween.duration().toFixed(4)}`)
    console.log(`% del timeline: ${(wordsTween.duration() / totalDur * 100).toFixed(1)}%`)
    console.log(`startPx (scroll): ${wStartPx.toFixed(1)}px`)
    console.log(`endPx (scroll):   ${wEndPx.toFixed(1)}px`)
    console.log(`RECORRIDO TOTAL:  ${wPx.toFixed(1)}px`)
    console.log('')
  } else {
    console.log('=== WORDS TWEEN ===')
    console.log('NO ENCONTRADO')
    console.log('')
  }

  // --- 8. RESUMEN ---
  console.log('=== RESUMEN EN PX DE SCROLL ===')
  console.log('')
  if (charsTween && wordsTween) {
    const cStart = charsTween.startTime()
    const cEnd = cStart + charsTween.duration()
    const wStart = wordsTween.startTime()
    const wEnd = wStart + wordsTween.duration()
    const gap = emptyTween ? emptyTween.duration() : 0

    const cStartPx = (cStart / totalDur) * scrollRange
    const cEndPx = (cEnd / totalDur) * scrollRange
    const gapPx = (gap / totalDur) * scrollRange
    const wStartPx = (wStart / totalDur) * scrollRange
    const wEndPx = (wEnd / totalDur) * scrollRange
    const afterEndPx = scrollRange - wEndPx

    console.log(`0px───────────${cStartPx.toFixed(0)}px──TÍTULO──${cEndPx.toFixed(0)}px──GAP──${wStartPx.toFixed(0)}px──SUBTÍTULO──${wEndPx.toFixed(0)}px──FIN──${scrollRange}px`)
    console.log('')
    console.log(`TÍTULO:    ${cStartPx.toFixed(0)}px → ${cEndPx.toFixed(0)}px = ${(cEndPx - cStartPx).toFixed(0)}px`)
    console.log(`GAP:       ${cEndPx.toFixed(0)}px → ${wStartPx.toFixed(0)}px = ${gapPx.toFixed(0)}px`)
    console.log(`SUBTÍTULO: ${wStartPx.toFixed(0)}px → ${wEndPx.toFixed(0)}px = ${(wEndPx - wStartPx).toFixed(0)}px`)
    console.log(`DESPUÉS:   ${wEndPx.toFixed(0)}px → ${scrollRange}px = ${afterEndPx.toFixed(0)}px`)
    console.log('')
    console.log(`TOTAL SCROLL: ${scrollRange}px`)
    console.log(`OCUPADO:      ${(wEndPx).toFixed(0)}px (${(wEndPx / scrollRange * 100).toFixed(1)}%)`)
    console.log(`SIN USO:      ${afterEndPx.toFixed(0)}px (${(afterEndPx / scrollRange * 100).toFixed(1)}%)`)
  }

  console.log('')
  console.log('========== FIN ==========')
})()
