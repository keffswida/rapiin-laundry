import { useId, useState } from 'react'
import { IconPlus } from './Icons'

/**
 * Akordeon satu-terbuka dengan expand halus (grid-template-rows).
 * Panel tetap dirender (visibility:hidden saat tertutup) supaya transisi jalan,
 * tetapi visibility membuat konten keluar dari pohon aksesibilitas saat tertutup.
 */
export default function Accordion({
  items,
  defaultOpen = null,
  headingLevel = 3,
  className = '',
  itemClassName = () => 'border-b border-ink-200',
  buttonClassName = () => 'text-ink-900',
  iconClassName = () => 'text-brand-700',
  panelClassName = () => 'pb-5 pr-10 text-sm leading-relaxed text-ink-600',
  idPrefix,
}) {
  const reactId = useId()
  const prefix = idPrefix ?? reactId
  const [openId, setOpenId] = useState(defaultOpen)
  const Heading = `h${headingLevel}`

  return (
    <div className={className}>
      {items.map((item) => {
        const open = openId === item.id
        const panelId = `${prefix}-panel-${item.id}`
        const buttonId = `${prefix}-button-${item.id}`

        return (
          <div key={item.id} className={itemClassName(item, open)}>
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className={`group/btn flex w-full items-start justify-between gap-4 py-5 text-left text-base font-bold transition ${buttonClassName(item, open)}`}
              >
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                  {item.title}
                </span>
                <span
                  className={`mt-0.5 shrink-0 transition-transform duration-300 ${iconClassName(item, open)} ${
                    open ? 'rotate-45' : 'group-hover/btn:rotate-90'
                  }`}
                >
                  <IconPlus className="h-5 w-5" />
                </span>
              </button>
            </Heading>

            <div className="acc-panel" data-open={open}>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={panelClassName(item, open)}
              >
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
