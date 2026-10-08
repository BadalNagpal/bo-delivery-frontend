export default function Footer() {
  return (
    <footer className="w-full bg-surface-bright shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded bg-primary-container flex items-center justify-center">
            <span className="text-on-primary font-headline-sm text-[11px] leading-none">N</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface">NEXUS</span>
          <span className="text-on-surface-variant font-body-sm text-body-sm hidden md:inline">— Crafted for high-grade delivery rituals</span>
        </div>
        <div className="flex items-center gap-space-lg">
          <div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>All systems nominal</span>
          </div>
          <div className="text-on-surface-variant font-body-sm text-body-sm">© 2025 NEXUS Engine.</div>
        </div>
      </div>
    </footer>
  );
}
