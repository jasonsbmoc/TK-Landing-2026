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
    padding: '128px 32px',
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
    padding: '13px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
  },
}

export function FriendsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {threshold: 0.15},
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={styles.section}>
      <h2 className="tk-heading" style={{...styles.headline, ...fadeUp(visible, 0)}}>
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
