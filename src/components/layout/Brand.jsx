import { LogoMark } from '../ui/Icons'

export default function Brand({ className = '', markClass = 'h-10 w-10', onClick }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} onClick={onClick}>
      <LogoMark className={`${markClass} transition duration-300 group-hover:rotate-[-6deg]`} />
      <span className="leading-none">
        <span className="block text-[15px] font-extrabold tracking-tight text-ink-900">
          Rapi-In
        </span>
        <span className="block text-[15px] font-extrabold tracking-tight text-ink-900">
          Laundry
        </span>
        <span className="sr-only">Cucian beres, hidup santai</span>
      </span>
    </span>
  )
}
