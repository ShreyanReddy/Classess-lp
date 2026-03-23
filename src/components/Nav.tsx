export default function Nav() {
  return (
    <nav
      data-nav
      className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 opacity-0"
      style={{ zIndex: 100 }}
      aria-label="Main navigation"
    >
      <div className="text-white font-semibold text-lg tracking-wide select-none">
        Classess
      </div>
      <ul className="flex items-center gap-8 text-white/80 text-sm font-medium list-none m-0 p-0">
        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
        <li><a href="#" className="hover:text-white transition-colors">For Parents</a></li>
        <li><a href="#" className="hover:text-white transition-colors">For Schools</a></li>
        <li>
          <a
            href="#"
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full hover:bg-white/20 transition-all"
          >
            Get Started
          </a>
        </li>
      </ul>
    </nav>
  )
}
