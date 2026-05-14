import { siteContent } from '@/data/siteContent'

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-8 text-sm text-lunar/70 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p>{siteContent.footer.credit}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dust">
          {siteContent.footer.secondary}
        </p>
      </div>
    </footer>
  )
}

export default Footer
