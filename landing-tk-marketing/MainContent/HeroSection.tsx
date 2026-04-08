import React, {useEffect, useState} from 'react'
import friendBadgeUrl from '../../images/FriendBadge.svg'
import arrowRightUrl from '../../images/Arrow-Right.svg'

interface GlowPos {
  x: number
  y: number
}

interface HeroSectionProps {
  imageUrl: string
  backgroundUrl: string
}

const HEADLINE = 'Fall back in love with writing.'
const TYPE_SPEED = 38   // ms per character
const TYPE_DELAY = 350  // ms before typing begins

const styles: Record<string, React.CSSProperties> = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '56px 32px 80px',
    backgroundColor: '#ffffff',
  },
  headline: {
    fontSize: 'clamp(48px, 6vw, 72px)',
    lineHeight: 1.08,
    letterSpacing: '-0.025em',
    maxWidth: '900px',
    marginBottom: '20px',
    color: '#1a1a1a',
    // Reserves the full line height so layout doesn't shift as text types in
    minHeight: '1.08em',
  },
  body: {
    fontSize: '18px',
    lineHeight: 1.65,
    maxWidth: '560px',
    color: '#444444',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '36px',
  },
  ctaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '56px',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 22px',
    borderRadius: '6px',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
  },
  imageContainer: {
    width: '100%',
    maxWidth: '1040px',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '32px 32px 0',
  },
  screenshot: {
    width: '100%',
    display: 'block',
    borderRadius: '8px 8px 0 0',
  },
}

// Returns transition styles for staggered fade-up on each hero element.
function fadeUp(visible: boolean, delay: number): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  }
}

export function HeroSection({imageUrl, backgroundUrl}: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  // cursorActive: cursor is visible and blinking. Starts false so it's invisible
  // before typing begins, without removing it from the DOM (which would cause reflow).
  const [cursorActive, setCursorActive] = useState(false)
  // cursorFading: typing is done, cursor is fading out via opacity transition.
  const [cursorFading, setCursorFading] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)
  const [glowPos, setGlowPos] = useState<GlowPos | null>(null)
  const [dotPos, setDotPos] = useState<{x: number; y: number} | null>(null)

  const handleBadgeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setGlowPos({x: e.clientX - rect.left, y: e.clientY - rect.top})
  }

  const handleBadgeMouseLeave = () => setGlowPos(null)

  const handleDotMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setDotPos({x: e.clientX - rect.left, y: e.clientY - rect.top})
  }

  const handleDotMouseLeave = () => setDotPos(null)

  // Typewriter
  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout>
    let interval: ReturnType<typeof setInterval>
    let charIndex = 0

    startTimer = setTimeout(() => {
      setCursorActive(true)
      interval = setInterval(() => {
        charIndex++
        setDisplayedText(HEADLINE.slice(0, charIndex))
        if (charIndex >= HEADLINE.length) {
          clearInterval(interval)
          setTypingDone(true)
        }
      }, TYPE_SPEED)
    }, TYPE_DELAY)

    return () => {
      clearTimeout(startTimer)
      clearInterval(interval)
    }
  }, [])

  // After typing finishes: trigger staggered fade-in, then fade cursor out.
  // setCursorFading rather than removing from DOM, so the headline doesn't reflow.
  useEffect(() => {
    if (!typingDone) return
    setFadeIn(true)
    const cursorTimer = setTimeout(() => setCursorFading(true), 1600)
    return () => clearTimeout(cursorTimer)
  }, [typingDone])

  return (
    <section style={styles.section}>
      {/* Badge outer: positioning context for the ambient glow layer */}
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          marginBottom: '32px',
          ...fadeUp(fadeIn, 0),
        }}
      >
        {/* Ambient glow: sits behind the badge with generous bleed so the gradient
            can taper off naturally. No border-radius — the radial gradient fades to
            transparent on its own, avoiding any hard clipped edge. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-36px',
            pointerEvents: 'none',
            opacity: glowPos ? 1 : 0,
            background: glowPos
              ? `radial-gradient(circle 28px at ${glowPos.x + 36}px ${glowPos.y + 36}px, rgba(255, 208, 0, 0.3) 0%, transparent 100%)`
              : 'transparent',
            transition: 'opacity 0.75s ease',
          }}
        />

        {/* Border wrapper: 1px padding whose background shows through as the "border".
            Radial gradient centered at cursor creates the traveling highlight. */}
        <div
          onMouseMove={handleBadgeMouseMove}
          onMouseLeave={handleBadgeMouseLeave}
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'inline-flex',
            borderRadius: '100px',
            padding: '1px',
            cursor: 'default',
            background: glowPos
              ? `radial-gradient(circle 64px at ${glowPos.x}px ${glowPos.y}px, #FFD84D 0%, #E8C84A 50%, #C9A830 100%)`
              : '#E8C84A',
          }}
        >
          <div
            className="tk-friend-badge-inner"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#FFFBEF',
              borderRadius: '100px',
              padding: '6px 16px 6px 10px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              color: '#7A5E00',
              fontWeight: 500,
            }}
          >
            <img src={friendBadgeUrl} alt="" width={18} height={18} />
            Early access for Friends of Medium now open
          </div>
        </div>
      </div>

      <h1 className="tk-heading tk-hero-headline" style={styles.headline}>
        {displayedText}
        {/* Always in DOM — opacity controls visibility so the headline never reflows.
            Animation uses background-color (not opacity), so opacity is free
            to be controlled by inline style + transition without interference. */}
        <span
          className="tk-cursor"
          aria-hidden="true"
          style={{
            opacity: cursorActive && !cursorFading ? 1 : 0,
            transition: cursorFading ? 'opacity 0.5s ease' : 'none',
          }}
        />
      </h1>

      <p style={{...styles.body, ...fadeUp(fadeIn, 180)}}>
        Explore a new social writing platform from Medium. Here, you can collect your thoughts,
        follow your flow, and share ideas as they emerge. TK is purpose-built to get you writing more often.
      </p>

      <div className="tk-hero-cta-row" style={{...styles.ctaRow, ...fadeUp(fadeIn, 340)}}>
        <a href="#" className="tk-button" style={styles.primaryButton}>
          Try it now{' '}
          <img className="tk-button-arrow" src={arrowRightUrl} alt="" width={16} height={16} style={{display: 'block'}} />
        </a>
        <a href="#" className="tk-secondary-link">
          Sign up for the waitlist
        </a>
      </div>

      <div
        onMouseMove={handleDotMouseMove}
        onMouseLeave={handleDotMouseLeave}
        style={{
          ...styles.imageContainer,
          position: 'relative',
          backgroundImage: `url(${backgroundUrl})`,
          ...fadeUp(fadeIn, 560),
        }}
      >
        {/* Dot grid reveal — same interaction as feature sections */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Crect x='9.75' y='9.75' width='2.5' height='2.5' fill='%23f0ece2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            WebkitMaskImage: dotPos
              ? `radial-gradient(circle 110px at ${dotPos.x}px ${dotPos.y}px, black 20%, transparent 100%)`
              : 'radial-gradient(circle 0px at -9999px -9999px, black 0%, transparent 0%)',
            maskImage: dotPos
              ? `radial-gradient(circle 110px at ${dotPos.x}px ${dotPos.y}px, black 20%, transparent 100%)`
              : 'radial-gradient(circle 0px at -9999px -9999px, black 0%, transparent 0%)',
            transition: dotPos ? 'none' : 'mask-image 0.4s ease, -webkit-mask-image 0.4s ease',
            pointerEvents: 'none',
          }}
        />
        <img src={imageUrl} alt="TK writing interface" style={{...styles.screenshot, position: 'relative', zIndex: 1}} />
      </div>
    </section>
  )
}
