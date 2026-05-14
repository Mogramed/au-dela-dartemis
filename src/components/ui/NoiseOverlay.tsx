function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70 mix-blend-screen"
      style={{
        backgroundImage:
          'radial-gradient(circle at 25% 15%, rgba(255,255,255,0.06) 0%, transparent 22%), radial-gradient(circle at 80% 20%, rgba(143,184,255,0.08) 0%, transparent 18%), linear-gradient(rgba(255,255,255,0.016), rgba(255,255,255,0.016))',
      }}
    />
  )
}

export default NoiseOverlay
