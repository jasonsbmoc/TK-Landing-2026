import React from 'react'
import tkWordmarkUrl from '../../images/TK-Wordmark.svg'
import mediumWordmarkUrl from '../../images/Medium-wordmark.svg'

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    position: 'sticky',
    top: 0,
    backgroundColor: '#ffffff',
    zIndex: 100,
    borderBottom: '1px solid #f0f0f0',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  tagline: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '5px',
    fontSize: '14px',
    color: '#1a1a1a',
    fontFamily: 'Inter, sans-serif',
    whiteSpace: 'nowrap' as const,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  signInLink: {
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    color: '#1a1a1a',
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
  },
  startButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
    letterSpacing: '-0.01em',
  },
}

export function NavBar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <img src={tkWordmarkUrl} alt="TK" height={24} />
        <span className="tk-nav-tagline" style={styles.tagline}>
          A new way to write, from{' '}
          <img src={mediumWordmarkUrl} alt="Medium" height={13} style={{display: 'block', position: 'relative', top: '1px'}} />
        </span>
      </div>
      <div style={styles.right}>
        <a href="#" className="tk-nav-signin" style={styles.signInLink}>Sign in with Medium</a>
        <a href="#" className="tk-button" style={styles.startButton}>Start writing</a>
      </div>
    </nav>
  )
}
