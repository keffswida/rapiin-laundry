/** Ikon inline. Semua 24x24, stroke currentColor, tanpa dependensi eksternal. */

function Svg({ children, className = 'h-5 w-5', strokeWidth = 1.8, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  )
}

export const IconArrow = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const IconArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
)

export const IconCheck = (p) => (
  <Svg {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Svg>
)

export const IconPlus = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const IconMinus = (p) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
)

export const IconClock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
)

export const IconTruck = (p) => (
  <Svg {...p}>
    <path d="M3 7.5h11v9H3zM14 10.5h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="17.5" cy="18" r="1.8" />
  </Svg>
)

export const IconSparkle = (p) => (
  <Svg {...p}>
    <path d="M12 3.5c.9 4 2.6 5.7 6.5 6.5-3.9.8-5.6 2.5-6.5 6.5-.9-4-2.6-5.7-6.5-6.5 3.9-.8 5.6-2.5 6.5-6.5Z" />
    <path d="M18.5 16.5c.4 1.7 1.1 2.4 2.8 2.8-1.7.4-2.4 1.1-2.8 2.8-.4-1.7-1.1-2.4-2.8-2.8 1.7-.4 2.4-1.1 2.8-2.8Z" />
  </Svg>
)

export const IconTag = (p) => (
  <Svg {...p}>
    <path d="M3.5 11.2V4.5a1 1 0 0 1 1-1h6.7c.3 0 .5.1.7.3l7.8 7.8a1 1 0 0 1 0 1.4l-6.7 6.7a1 1 0 0 1-1.4 0L3.8 11.9a1 1 0 0 1-.3-.7Z" />
    <circle cx="8" cy="8" r="1.6" />
  </Svg>
)

export const IconCalendar = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
  </Svg>
)

export const IconMachine = (p) => (
  <Svg {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="3" />
    <circle cx="12" cy="13.5" r="4.5" />
    <path d="M8 7h.01M11 7h.01" />
  </Svg>
)

export const IconHome = (p) => (
  <Svg {...p}>
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19Z" />
    <path d="M9.5 20.5v-6h5v6" />
  </Svg>
)

export const IconMenu = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

export const IconClose = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const IconWhatsapp = (p) => (
  <Svg {...p}>
    <path d="M20 11.7a7.9 7.9 0 0 1-11.6 7l-4.4 1.2 1.2-4.3A7.9 7.9 0 1 1 20 11.7Z" />
    <path d="M9 9.5c.3 2.5 2 4.2 4.5 4.7l1-1.2 1.7.8c-.3 1.2-1.4 1.7-2.6 1.4-2.9-.7-5.3-3.1-6-6-.3-1.2.2-2.3 1.4-2.6l.8 1.7-1.2 1" />
  </Svg>
)

export const IconInstagram = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconMail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m4 7.5 8 5.5 8-5.5" />
  </Svg>
)

export const IconPin = (p) => (
  <Svg {...p}>
    <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
)

export const IconCopy = (p) => (
  <Svg {...p}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
    <path d="M15.5 5.5A2 2 0 0 0 13.5 3.5h-7a3 3 0 0 0-3 3v7a2 2 0 0 0 2 2" />
  </Svg>
)

export const IconBasket = (p) => (
  <Svg {...p}>
    <path d="M3.5 9.5h17l-1.6 9.2a2 2 0 0 1-2 1.8H7.1a2 2 0 0 1-2-1.8Z" />
    <path d="M8 9.5 11 4M16 9.5 13 4M9.5 13v3.5M14.5 13v3.5" />
  </Svg>
)

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 19 6v5.5c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
)

export const IconStar = (p) => (
  <Svg {...p}>
    <path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8Z" />
  </Svg>
)

export const IconQuote = ({ className = 'h-8 w-8' }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
    <path d="M13 22c-3.6 0-6.3-2.8-6.3-6.5C6.7 11.2 9.6 8 13.6 7l.9 1.8C11.9 9.8 10.4 11.4 10.3 13.6c.3-.1.7-.2 1.1-.2 3 0 5.2 2.3 5.2 5.4 0 3-2.3 5.2-5.2 5.2Zm11 0c-3.6 0-6.3-2.8-6.3-6.5 0-4.3 2.9-7.5 6.9-8.5l.9 1.8c-2.6 1-4.1 2.6-4.2 4.8.3-.1.7-.2 1.1-.2 3 0 5.2 2.3 5.2 5.4 0 3-2.3 5.2-5.2 5.2Z" />
  </svg>
)

/** Logo: lingkaran biru + keranjang. */
export function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white ${className}`}
    >
      <IconBasket className="h-[58%] w-[58%]" strokeWidth={2} />
    </span>
  )
}

/* ---- Ikon dashboard admin ---- */

export const IconGrid = (p) => (
  <Svg {...p}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </Svg>
)

export const IconBag = (p) => (
  <Svg {...p}>
    <path d="M5.5 8h13l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </Svg>
)

export const IconUsers = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19.5c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" />
    <path d="M15.5 6.2a3 3 0 0 1 0 5.6M17 14.9c2 .7 3.5 2.4 3.5 4.6" />
  </Svg>
)

export const IconShirt = (p) => (
  <Svg {...p}>
    <path d="M8.5 3.5 5 5.5 3.5 10l3 1v9.5h11V11l3-1L19 5.5l-3.5-2a3.5 3.5 0 0 1-7 0Z" />
  </Svg>
)

export const IconWallet = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="6" width="17" height="13" rx="3" />
    <path d="M3.5 9.5h17M15.5 14.5h2" />
  </Svg>
)

export const IconReceipt = (p) => (
  <Svg {...p}>
    <path d="M6 3.5h12v17l-2.4-1.6-2.4 1.6-2.4-1.6L8.4 20.5 6 18.9Z" />
    <path d="M9 8.5h6M9 12.5h6" />
  </Svg>
)

export const IconTrend = (p) => (
  <Svg {...p}>
    <path d="M4 17.5 9.5 12l3.5 3.5L20 8" />
    <path d="M15 8h5v5" />
  </Svg>
)

export const IconSettings = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v2M12 18.5v2M4.9 7.8l1.7 1M17.4 15.2l1.7 1M4.9 16.2l1.7-1M17.4 8.8l1.7-1" />
  </Svg>
)

export const IconStore = (p) => (
  <Svg {...p}>
    <path d="M4 9.5 5.5 5h13L20 9.5M4.5 9.5v10h15v-10" />
    <path d="M4 9.5a2.4 2.4 0 0 0 4 1.7 2.4 2.4 0 0 0 4 0 2.4 2.4 0 0 0 4 0 2.4 2.4 0 0 0 4-1.7" />
    <path d="M10 19.5v-5h4v5" />
  </Svg>
)

export const IconBell = (p) => (
  <Svg {...p}>
    <path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2H5Z" />
    <path d="M10.5 19.5a1.6 1.6 0 0 0 3 0" />
  </Svg>
)

export const IconChevronDown = (p) => (
  <Svg {...p}>
    <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
  </Svg>
)

export const IconChevronRight = (p) => (
  <Svg {...p}>
    <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />
  </Svg>
)

export const IconEye = (p) => (
  <Svg {...p}>
    <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.6" />
  </Svg>
)

export const IconDownload = (p) => (
  <Svg {...p}>
    <path d="M12 4.5v10M8 11l4 4 4-4M4.5 19.5h15" />
  </Svg>
)

export const IconHelp = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.7 9.4A2.4 2.4 0 0 1 14.4 10c0 1.7-2.4 2-2.4 3.6M12 17h.01" />
  </Svg>
)

export const IconLogout = (p) => (
  <Svg {...p}>
    <path d="M14 5.5H6.5A1.5 1.5 0 0 0 5 7v10a1.5 1.5 0 0 0 1.5 1.5H14" />
    <path d="M11 12h9M17 8.5l3.5 3.5L17 15.5" />
  </Svg>
)

export const IconArrowDownLeft = (p) => (
  <Svg {...p}>
    <path d="M17 7 7 17M7 8.5V17h8.5" />
  </Svg>
)

export const IconSearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </Svg>
)

export const IconUserPlus = (p) => (
  <Svg {...p}>
    <circle cx="10" cy="8" r="3.2" />
    <path d="M4 19.5c0-3 2.7-5.2 6-5.2 1.2 0 2.3.3 3.2.8M17.5 13v5M15 15.5h5" />
  </Svg>
)

export const IconRefresh = (p) => (
  <Svg {...p}>
    <path d="M19 12a7 7 0 1 1-2-4.9" />
    <path d="M19 4v3.5h-3.5" />
  </Svg>
)

export const IconPause = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M10 9.5v5M14 9.5v5" />
  </Svg>
)

export const IconCheckCircle = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.2 2.4 2.4 4.6-5" />
  </Svg>
)

export const IconLink = (p) => (
  <Svg {...p}>
    <path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1.2 1.2" />
    <path d="M13.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1.2-1.2" />
  </Svg>
)

export const IconPlug = (p) => (
  <Svg {...p}>
    <path d="M9 3v5M15 3v5" />
    <path d="M7 8h10v3a5 5 0 0 1-10 0V8Z" />
    <path d="M12 16v5" />
  </Svg>
)

export const IconUpload = (p) => (
  <Svg {...p}>
    <path d="M12 16V4m0 0-4 4m4-4 4 4" />
    <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
  </Svg>
)
