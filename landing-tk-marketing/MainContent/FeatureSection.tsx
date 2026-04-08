import React, {useEffect, useRef, useState} from 'react'

type ImageAnchor = 'bottom' | 'right' | 'bottom-right'

interface FeatureSectionProps {
  layout: 'image-left' | 'image-right'
  imageAnchor: ImageAnchor
  title: string
  body: string
  imageUrl: string
  imageAlt: string
  backgroundUrl: string
}

// Internal padding on the colored container — leaves space on non-anchor sides so
// the colored background shows through, while the image bleeds to the anchor edge(s).
function getContainerPadding(anchor: ImageAnchor): string {
  switch (anchor) {
    case 'bottom':
      return '40px 32px 0'
    case 'right':
      return '32px 0 32px 32px'
    case 'bottom-right':
      return '40px 0 0 32px'
  }
}

function getContainerFlex(anchor: ImageAnchor): React.CSSProperties {
  switch (anchor) {
    case 'bottom':
      return {alignItems: 'flex-end', justifyContent: 'center'}
    case 'right':
      return {alignItems: 'center', justifyContent: 'flex-end'}
    case 'bottom-right':
      return {alignItems: 'flex-end', justifyContent: 'flex-end'}
  }
}

function getImageRadius(anchor: ImageAnchor): string {
  switch (anchor) {
    case 'bottom':
      return '10px 10px 0 0'
    case 'right':
      return '10px 0 0 10px'
    case 'bottom-right':
      return '10px 0 0 0'
  }
}

export function FeatureSection({
  layout,
  imageAnchor,
  title,
  body,
  imageUrl,
  imageAlt,
  backgroundUrl,
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [dotPos, setDotPos] = useState<{x: number; y: number} | null>(null)

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
      {threshold: 0.12, rootMargin: '0px 0px -32px 0px'},
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleDotMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setDotPos({x: e.clientX - rect.left, y: e.clientY - rect.top})
  }

  const handleDotMouseLeave = () => setDotPos(null)

  const textPane = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 48px)',
      }}
    >
      <h2
        className="tk-heading"
        style={{
          fontSize: 'clamp(36px, 4vw, 52px)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '20px',
          color: '#1a1a1a',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: '17px',
          lineHeight: 1.65,
          color: '#444444',
          fontFamily: 'Inter, sans-serif',
          maxWidth: '380px',
        }}
      >
        {body}
      </p>
    </div>
  )

  // For image-right sections, the image pane is second in DOM order.
  // The CSS class tk-feature-image-top pulls it above text on mobile via order: -1.
  const imagePaneClass = layout === 'image-right' ? 'tk-feature-image-top' : undefined

  // Dot grid mask: hidden off-screen when no cursor, revealed in a soft circle on hover.
  const dotMask = dotPos
    ? `radial-gradient(circle 110px at ${dotPos.x}px ${dotPos.y}px, black 20%, transparent 100%)`
    : 'radial-gradient(circle 0px at -9999px -9999px, black 0%, transparent 0%)'

  const imagePane = (
    <div className={imagePaneClass} style={{display: 'flex', alignItems: 'stretch'}}>

      <div
        className="tk-feature-image-container"
        onMouseMove={handleDotMouseMove}
        onMouseLeave={handleDotMouseLeave}
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: getContainerPadding(imageAnchor),
          display: 'flex',
          minHeight: '400px',
          alignSelf: 'stretch',
          ...getContainerFlex(imageAnchor),
        }}
      >
        {/* Dot grid — sits above the background, below the UI screenshot.
            Revealed only within the cursor radius via CSS mask. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Crect x='9.75' y='9.75' width='2.5' height='2.5' fill='%23f0ece2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            WebkitMaskImage: dotMask,
            maskImage: dotMask,
            transition: dotPos ? 'none' : 'mask-image 0.4s ease, -webkit-mask-image 0.4s ease',
            pointerEvents: 'none',
          }}
        />

        <img
          src={imageUrl}
          alt={imageAlt}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            display: 'block',
            borderRadius: getImageRadius(imageAnchor),
          }}
        />
      </div>
    </div>
  )

  const lineBase: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    pointerEvents: 'none',
  }

  return (
    <section
      ref={sectionRef}
      className="tk-feature-section"
      style={{
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* Lines snap to the image container edges, inset by the section's 88px vertical padding */}
      <div aria-hidden="true" className="tk-feature-line-top" style={{...lineBase, top: 88}} />
      <div aria-hidden="true" className="tk-feature-line-bottom" style={{...lineBase, bottom: 88}} />
      {layout === 'image-left' ? (
        <>
          {imagePane}
          {textPane}
        </>
      ) : (
        <>
          {textPane}
          {imagePane}
        </>
      )}
    </section>
  )
}
