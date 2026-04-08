import React from 'react'

// Fixed vertical grid lines framing the page content.
// Remove <PageGrid /> from index.tsx to disable entirely.
export function PageGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* Left rail */}
      <div className="tk-grid-left" style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 48,
        width: 1,
        backgroundColor: 'rgba(0,0,0,0.06)',
      }} />
      {/* Right rail */}
      <div className="tk-grid-right" style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 48,
        width: 1,
        backgroundColor: 'rgba(0,0,0,0.06)',
      }} />
    </div>
  )
}
