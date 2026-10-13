import { IconDownload } from '../../components/ui/Icons'

/**
 * Tombol ekspor.
 * variant="split" → biru solid, pemisah, label "PDF | Excel"
 * variant="outline" → putih (Ekspor data)
 */
export default function ExportButton({ label = 'Ekspor laporan', formats, variant = 'split' }) {
  if (variant === 'outline') {
    return (
      <button type="button" className="adm-btn-outline">
        <IconDownload className="h-4 w-4" />
        {label}
      </button>
    )
  }

  return (
    <button type="button" className="adm-btn-primary">
      <IconDownload className="h-4 w-4" />
      {label}
      <span aria-hidden="true" className="mx-0.5 h-4 w-px bg-white/30" />
      <span className="text-white/85">{formats?.join('  |  ')}</span>
    </button>
  )
}
