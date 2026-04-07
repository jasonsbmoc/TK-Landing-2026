import React from 'react'
import tkWordmarkUrl from '../../images/TK-Wordmark.svg'
import mediumWordmarkUrl from '../../images/Medium-wordmark.svg'

// Approximation of Medium's grey-30 token
const GRAY = '#ADADAD'

// opacity(0.38) on a dark SVG over white ≈ #A6A6A6, close to grey-30
const LOGO_FILTER = 'opacity(0.38)'

const footerColumns = [
  ['Home', 'About', 'Membership'],
  ['Blog', 'Careers', 'Help', 'Status'],
  ['Privacy', 'Rules', 'Terms'],
]

export function Footer() {
  return (
    <footer className="tk-footer">
      <div className="tk-footer-upper">

        {/* Branding: TK logo left, tagline right (nowrap keeps it on one line) */}
        <div className="tk-footer-branding">
          <img
            src={tkWordmarkUrl}
            alt="TK"
            height={64}
            style={{display: 'block', filter: LOGO_FILTER, flexShrink: 0}}
          />
          <div className="tk-footer-tagline" style={{color: GRAY}}>
            A new way to write, from{' '}
            <img
              src={mediumWordmarkUrl}
              alt="Medium"
              height={18}
              style={{display: 'block', filter: LOGO_FILTER}}
            />
          </div>
        </div>

        {/* Nav: 3 columns on desktop, 2-column grid on mobile */}
        <div className="tk-footer-nav">
          {footerColumns.map((col, colIndex) => (
            <div
              key={colIndex}
              style={{display: 'flex', flexDirection: 'column', gap: '14px'}}
            >
              {col.map(label => (
                <a
                  key={label}
                  href="#"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    color: GRAY,
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: GRAY,
          textAlign: 'center',
        }}
      >
        &copy; A Medium Corporation 2026 &mdash; All rights reserved.
      </div>
    </footer>
  )
}
