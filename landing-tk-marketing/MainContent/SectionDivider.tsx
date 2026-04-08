import React from 'react'

// Paired horizontal lines placed between sections — one closing the top section,
// one opening the bottom. Remove all <SectionDivider /> usages in index.tsx to disable.
export function SectionDivider() {
  const line: React.CSSProperties = {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
  }
  return (
    <div aria-hidden="true" style={{display: 'flex', flexDirection: 'column', gap: 12}}>
      <div style={line} />
      <div style={line} />
    </div>
  )
}
