import React from 'react'
import tkWordmarkUrl from '../../images/TK-Wordmark.svg'
import mediumWordmarkUrl from '../../images/Medium-wordmark.svg'

const GRAY = '#ADADAD'
const LOGO_FILTER = 'opacity(0.38)'

export function Footer() {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #f0f0f0',
      padding: '48px 48px 56px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px',
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <img
          src={tkWordmarkUrl}
          alt="TK"
          height={32}
          style={{display: 'block', filter: LOGO_FILTER, flexShrink: 0}}
        />
        <div className="tk-footer-tagline" style={{color: GRAY, fontSize: '16px'}}>
          A new way to write, from{' '}
          <img
            src={mediumWordmarkUrl}
            alt="Medium"
            height={16}
            style={{display: 'block', position: 'relative', top: '1px', filter: LOGO_FILTER}}
          />
        </div>
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
        color: GRAY,
        textAlign: 'center',
      }}>
        &copy; A Medium Corporation 2026<br className="tk-footer-break" /> &mdash; All rights reserved.
      </div>
    </footer>
  )
}
