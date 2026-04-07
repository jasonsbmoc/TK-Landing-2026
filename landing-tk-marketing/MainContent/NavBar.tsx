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
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#1a1a1a',
    fontFamily: 'Inter, sans-serif',
  },
}

export function NavBar() {
  return (
    <nav style={styles.nav}>
      <img src={tkWordmarkUrl} alt="TK" height={24} />
      <span style={styles.right}>
        A new way to write, from{' '}
        <img src={mediumWordmarkUrl} alt="Medium" height={14} style={{display: 'block'}} />
      </span>
    </nav>
  )
}
