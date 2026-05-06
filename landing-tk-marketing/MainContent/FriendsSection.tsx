import React, {useEffect, useRef, useState} from 'react'
import arrowRightUrl from '../../images/Arrow-Right.svg'

function fadeUp(visible: boolean, delay: number): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  }
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '44px 32px 88px',
    backgroundColor: '#ffffff',
  },
  headline: {
    fontSize: 'clamp(42px, 5vw, 64px)',
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    marginBottom: '20px',
    maxWidth: '900px',
    color: '#1a1a1a',
  },
  body: {
    fontSize: '18px',
    lineHeight: 1.65,
    maxWidth: '560px',
    color: '#444444',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '40px',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    padding: '13px 22px 13px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
  },
}

// Badge centers in CSS px (viewBox coords × 0.5 render scale).
// Used to compute repulsion direction per badge.
const CENTERS = [
  {x: 38, y: 43},  // large badge, left
  {x: 126, y: 59}, // medium badge, right
  {x: 98, y: 14},  // small badge, top-right
]
const MAX_PUSH = 5   // px
const FALLOFF = 65   // px — distance at which push reaches zero
const LERP = 0.14    // smoothing factor per frame

export function FriendsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [svgActive, setSvgActive] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const g0 = useRef<SVGGElement>(null)
  const g1 = useRef<SVGGElement>(null)
  const g2 = useRef<SVGGElement>(null)

  // Scroll-triggered section reveal
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      {threshold: 0.15},
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Repulsion animation — runs entirely outside React via rAF + direct DOM writes.
  // Lerp smoothing means badges glide rather than snap, and naturally decay back
  // to rest when the cursor leaves without any CSS transition needed.
  useEffect(() => {
    const container = containerRef.current!
    if (!container) return
    const gEls = [g0.current, g1.current, g2.current]

    let active = false
    let cx = 0, cy = 0
    const pushes = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
    let rafId = 0

    function tick() {
      rafId = 0
      let needsMore = false

      for (let i = 0; i < 3; i++) {
        const dx = CENTERS[i].x - cx
        const dy = CENTERS[i].y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        let tx = 0, ty = 0
        if (active && dist > 0.01) {
          const strength = Math.max(0, 1 - dist / FALLOFF)
          tx = (dx / dist) * MAX_PUSH * strength
          ty = (dy / dist) * MAX_PUSH * strength
        }
        pushes[i].x += (tx - pushes[i].x) * LERP
        pushes[i].y += (ty - pushes[i].y) * LERP
        if (gEls[i]) {
          gEls[i]!.style.transform = `translate(${pushes[i].x.toFixed(2)}px, ${pushes[i].y.toFixed(2)}px)`
        }
        if (Math.abs(pushes[i].x) > 0.01 || Math.abs(pushes[i].y) > 0.01 || active) needsMore = true
      }

      if (needsMore) rafId = requestAnimationFrame(tick)
    }

    function ensureRaf() { if (!rafId) rafId = requestAnimationFrame(tick) }

    function onMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect()
      cx = e.clientX - rect.left
      cy = e.clientY - rect.top
      if (!active) { active = true; setSvgActive(true) }
      ensureRaf()
    }

    function onLeave() {
      active = false
      setSvgActive(false)
      ensureRaf() // keep ticking so pushes lerp back to zero
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} style={styles.section}>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          display: 'inline-block',
          marginBottom: '32px',
          ...fadeUp(visible, 0),
        }}
      >
        <svg
          width={150}
          height={83}
          viewBox="0 0 300 166"
          fill="none"
          overflow="visible"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            filter: svgActive
              ? 'drop-shadow(0 1px 6px rgba(255, 235, 120, 0.5))'
              : 'drop-shadow(0 1px 0px rgba(255, 235, 120, 0))',
            transition: svgActive ? 'filter 0.25s ease' : 'filter 0.8s ease',
          }}
        >
          <g ref={g0}>
            <path fillRule="evenodd" clipRule="evenodd" d="M65.8126 10.7089C72.8684 9.75195 78.9186 14.1134 84.2073 17.9561C87.2029 20.1752 90.3435 22.4434 92.8561 23.1389C95.3687 23.8344 98.8874 23.2878 102.492 22.8679C109.083 22.0429 116.632 21.1576 122.565 25.673C128.497 30.1884 129.655 37.7006 130.615 44.2721C131.171 47.8585 131.736 51.5131 132.921 53.6324C134.107 55.7516 137.285 58.2925 140.222 60.5887C145.335 64.6625 151.15 69.3323 152.107 76.3879C153.064 83.4436 148.704 89.4938 144.861 94.7824C142.642 97.7782 140.373 100.919 139.677 103.431C138.982 105.944 139.528 109.463 139.948 113.068C140.773 119.658 141.659 127.208 137.144 133.14C132.629 139.073 125.116 140.23 118.544 141.191C114.957 141.746 111.303 142.311 109.184 143.497C107.064 144.682 104.525 147.86 102.228 150.797C98.1546 155.91 93.4848 161.725 86.4291 162.682C79.3732 163.639 73.3224 159.279 68.0336 155.436C65.0379 153.217 61.8973 150.948 59.3846 150.252C56.872 149.557 53.3532 150.104 49.7484 150.523C43.1584 151.348 35.6094 152.234 29.6767 147.719C23.744 143.204 22.5859 135.691 21.6253 129.119C21.0696 125.533 20.505 121.878 19.3193 119.759C18.1336 117.64 14.9566 115.1 12.0196 112.804C6.90681 108.73 1.09115 104.06 0.133797 97.0044C-0.823388 89.9486 3.5382 83.8985 7.3809 78.6098C9.60008 75.6141 11.8681 72.4726 12.5636 69.9599C13.259 67.4473 12.7125 63.9285 12.2926 60.3236C11.4677 53.7335 10.5826 46.1846 15.0979 40.2519C19.6132 34.3192 27.1251 33.1612 33.6968 32.2006C37.2833 31.6449 40.9378 31.0802 43.0571 29.8946C45.1762 28.7089 47.7164 25.5318 50.0125 22.5949C54.0864 17.482 58.7567 11.6661 65.8126 10.7089ZM112.976 73.1542C110.471 54.5547 91.5515 47.7177 75.3557 65.9568C74.3239 67.1188 72.6374 67.3476 71.3333 66.5025C50.8649 53.246 34.4498 64.8675 36.99 83.4624C39.5303 102.057 68.085 117.639 77.937 122.781L77.9453 122.78C79.936 123.816 82.35 123.489 83.9841 121.961C92.11 114.38 115.374 90.9596 112.976 73.1542Z" fill="#FFC017"/>
          </g>
          <g ref={g1}>
            <path fillRule="evenodd" clipRule="evenodd" d="M257.228 70.312C261.64 70.7574 264.671 74.2777 267.316 77.3735C268.808 79.1528 270.381 80.9836 271.802 81.7699C273.223 82.556 275.434 82.7358 277.678 83.0052C281.789 83.4629 286.49 84.0234 289.428 87.6202C292.365 91.2169 291.975 95.9353 291.602 100.055C291.418 102.308 291.228 104.603 291.638 106.059C292.049 107.515 293.605 109.516 295.05 111.333C297.555 114.543 300.399 118.217 299.953 122.629C299.508 127.042 295.988 130.073 292.892 132.718C291.112 134.21 289.282 135.783 288.495 137.204C287.709 138.624 287.529 140.835 287.26 143.079C286.802 147.191 286.242 151.892 282.645 154.829C279.048 157.766 274.33 157.376 270.21 157.003C267.957 156.819 265.662 156.63 264.206 157.04C262.75 157.45 260.75 159.006 258.932 160.451C255.722 162.956 252.049 165.8 247.636 165.355C243.224 164.909 240.193 161.389 237.548 158.293C236.056 156.514 234.483 154.683 233.062 153.897C231.641 153.111 229.43 152.931 227.186 152.661C223.075 152.204 218.373 151.643 215.436 148.046C212.499 144.45 212.889 139.731 213.262 135.611C213.446 133.359 213.636 131.063 213.225 129.607C212.815 128.152 211.259 126.151 209.814 124.333C207.309 121.123 204.465 117.45 204.911 113.038C205.356 108.625 208.876 105.594 211.972 102.949C213.751 101.457 215.582 99.8839 216.369 98.4631C217.155 97.0423 217.334 94.8316 217.604 92.5874C218.062 88.476 218.622 83.7749 222.219 80.8375C225.816 77.9002 230.534 78.2903 234.654 78.6632C236.907 78.8477 239.202 79.037 240.658 78.6269C242.114 78.2166 244.114 76.6607 245.932 75.2154C249.142 72.7105 252.815 69.8667 257.228 70.312ZM276.722 114.985C277.906 103.356 267.441 96.4675 254.982 105.162C254.188 105.715 253.133 105.609 252.466 104.908C241.994 93.905 230.364 98.5582 229.201 110.189C228.038 121.821 243.07 135.407 248.29 139.953L248.295 139.954C249.35 140.871 250.859 141.023 252.071 140.335C258.094 136.923 275.588 126.118 276.722 114.985Z" fill="#FFC017"/>
          </g>
          <g ref={g2}>
            <path fillRule="evenodd" clipRule="evenodd" d="M196.013 1.00129C198.506 0.945555 200.441 2.70158 202.131 4.24707C203.086 5.13717 204.09 6.05085 204.937 6.39175C205.784 6.73262 207.03 6.6807 208.302 6.67627C210.628 6.64826 213.291 6.63625 215.178 8.44114C217.066 10.2461 217.173 12.9067 217.249 15.2319C217.301 16.5021 217.355 17.7964 217.684 18.5807C218.014 19.3648 219.019 20.3735 219.951 21.288C221.57 22.907 223.411 24.7614 223.467 27.255C223.523 29.7485 221.767 31.6833 220.221 33.3731C219.331 34.3283 218.419 35.3319 218.078 36.179C217.737 37.0262 217.788 38.2727 217.792 39.5439C217.82 41.8702 217.832 44.5329 216.027 46.4204C214.222 48.3078 211.562 48.4158 209.236 48.4918C207.966 48.5442 206.672 48.597 205.888 48.9264C205.103 49.2559 204.095 50.2615 203.18 51.1932C201.561 52.8127 199.707 54.6534 197.213 54.7092C194.72 54.7649 192.785 53.0089 191.095 51.4634C190.14 50.5734 189.136 49.6607 188.289 49.3197C187.442 48.9789 186.196 49.0308 184.924 49.0352C182.598 49.0632 179.935 49.0743 178.048 47.2693C176.16 45.4644 176.053 42.8038 175.978 40.4786C175.925 39.2084 175.871 37.914 175.542 37.1298C175.212 36.3456 174.207 35.337 173.275 34.4225C171.656 32.8035 169.815 30.9491 169.759 28.4555C169.703 25.9619 171.459 24.0271 173.005 22.3373C173.895 21.3821 174.808 20.3785 175.149 19.5315C175.489 18.6843 175.439 17.4378 175.434 16.1665C175.406 13.8403 175.394 11.1776 177.199 9.29008C179.004 7.40262 181.664 7.29567 183.99 7.21971C185.26 7.16733 186.554 7.1145 187.339 6.78512C188.123 6.45575 189.131 5.44912 190.046 4.5172C191.665 2.89777 193.519 1.05705 196.013 1.00129ZM209.974 24.5911C209.833 18.0188 203.516 14.895 197.162 20.6066C196.757 20.9705 196.161 20.9838 195.741 20.6384C189.138 15.2198 182.967 18.6194 183.12 25.1914C183.273 31.7635 192.6 38.3101 195.827 40.4874L195.83 40.4874C196.482 40.9262 197.335 40.9072 197.964 40.4397C201.091 38.1202 210.109 30.8828 209.974 24.5911Z" fill="#FFC017"/>
          </g>
        </svg>
      </div>

      <h2 className="tk-heading" style={{...styles.headline, ...fadeUp(visible, 120)}}>
        Friends get in early.
      </h2>
      <p style={{...styles.body, ...fadeUp(visible, 160)}}>
        As we get TK ready for launch, we&rsquo;re inviting our most dedicated community members
        to test its features and give us feedback. Want in? Become a Friend of Medium for early access.
      </p>
      <a href="#" className="tk-button" style={{...styles.button, ...fadeUp(visible, 300)}}>
        Upgrade now{' '}
        <img className="tk-button-arrow" src={arrowRightUrl} alt="" width={16} height={16} style={{display: 'block'}} />
      </a>
    </section>
  )
}
