import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Toggle from '../components/Toggle'
import {
  IconCheck,
  IconPlug,
  IconShield,
  IconStore,
  IconUpload,
  IconUsers,
} from '../../components/ui/Icons'
import {
  FOOTER_FIGMA,
  HOURS_INITIAL,
  HOURS_OUTSIDE,
  NOTA_INITIAL,
  NOTIF_INITIAL,
  PROFILE_HINTS,
  PROFILE_INITIAL,
  REGIONAL_INITIAL,
  REGIONAL_OPTS,
  SETTINGS_TABS,
} from '../data/pengaturan'

const TAB_ICON = { store: IconStore, users: IconUsers, shield: IconShield, plug: IconPlug }

function countDirty(current, saved) {
  return Object.keys(saved).filter((k) => current[k] !== saved[k]).length
}

/** Halaman Pengaturan — form mock interaktif (Umum) + placeholder tab lain. */
export default function Pengaturan() {
  const [tab, setTab] = useState('umum')

  const [savedProfile, setSavedProfile] = useState(PROFILE_INITIAL)
  const [profile, setProfile] = useState(PROFILE_INITIAL)
  const [hours, setHours] = useState(HOURS_INITIAL)
  const [savedHours, setSavedHours] = useState(HOURS_INITIAL)
  const [outside, setOutside] = useState(false)
  const [savedOutside, setSavedOutside] = useState(false)
  const [regional, setRegional] = useState(REGIONAL_INITIAL)
  const [savedRegional, setSavedRegional] = useState(REGIONAL_INITIAL)
  const [nota, setNota] = useState(NOTA_INITIAL)
  const [savedNota, setSavedNota] = useState(NOTA_INITIAL)
  const [notif, setNotif] = useState(NOTIF_INITIAL)
  const [savedNotif, setSavedNotif] = useState(NOTIF_INITIAL)
  const [justSaved, setJustSaved] = useState(false)

  const dirty = useMemo(() => {
    let n = countDirty(profile, savedProfile)
    n += countDirty(regional, savedRegional)
    n += countDirty(nota, savedNota)
    n += countDirty(notif, savedNotif)
    if (outside !== savedOutside) n += 1
    hours.forEach((h, i) => {
      const s = savedHours[i]
      if (h.from !== s.from || h.to !== s.to) n += 1
    })
    return n
  }, [profile, savedProfile, regional, savedRegional, nota, savedNota, notif, savedNotif, outside, savedOutside, hours, savedHours])

  function save() {
    setSavedProfile(profile)
    setSavedRegional(regional)
    setSavedNota(nota)
    setSavedNotif(notif)
    setSavedHours(hours)
    setSavedOutside(outside)
    setJustSaved(true)
  }

  function reset() {
    setProfile(savedProfile)
    setRegional(savedRegional)
    setNota(savedNota)
    setNotif(savedNotif)
    setHours(savedHours)
    setOutside(savedOutside)
    setJustSaved(false)
  }

  const footerText =
    dirty > 0
      ? `${dirty} perubahan belum disimpan`
      : justSaved
        ? 'Perubahan tersimpan · barusan'
        : 'Tampilan contoh · Belum ada perubahan'

  const setProfileField = (key) => (e) => {
    setProfile((p) => ({ ...p, [key]: e.target.value }))
    setJustSaved(false)
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PageHeader
        title="Pengaturan"
        desc="Kelola profil usaha dan preferensi operasional outlet utama."
        actions={
          <button type="button" className="text-xs font-medium text-brand-700 hover:text-brand-900">
            Pratinjau pengaturan
          </button>
        }
      />

      <div
        role="tablist"
        aria-label="Bagian pengaturan"
        className="adm-card flex flex-wrap items-center gap-1 p-1.5"
      >
        {SETTINGS_TABS.map((t) => {
          const Icon = TAB_ICON[t.icon]
          const active = t.id === tab
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-[13px] font-medium transition-colors ${
                active ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:bg-ink-50 hover:text-ink-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {tab !== 'umum' ? (
        <section className="adm-card flex flex-col items-center gap-2 px-6 py-16 text-center">
          <h2 className="text-base font-semibold text-ink-900">
            {SETTINGS_TABS.find((t) => t.id === tab)?.label}
          </h2>
          <p className="max-w-sm text-sm text-ink-400">
            Bagian ini merupakan navigasi ke bagian lain dan belum tersedia pada mockup statis.
          </p>
          <button
            type="button"
            onClick={() => setTab('umum')}
            className="adm-btn-outline mt-2"
          >
            Kembali ke Umum
          </button>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          <div className="flex flex-col gap-3 xl:col-span-2">
            <section className="adm-card p-4 sm:p-5">
              <h2 className="text-sm font-semibold tracking-tight text-ink-900">Profil usaha</h2>
              <p className="mt-0.5 text-xs text-ink-400">Informasi outlet yang tercetak pada nota pelanggan.</p>

              <div className="mt-4 flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-700"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.5 4 6 5.5 4 9l2.5 1.5V20h11v-9.5L20 9l-2-3.5-2.5-1.5" />
                    <path d="M8.5 4a3.5 3.5 0 0 0 7 0" />
                  </svg>
                </div>
                <div className="flex flex-col items-start gap-1.5">
                  <button type="button" className="adm-btn-outline">
                    <IconUpload className="h-4 w-4 text-ink-400" />
                    Ubah logo
                  </button>
                  <p className="text-[11px] text-ink-400">PNG atau JPG · Maksimal 2 MB</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ink-500">Nama usaha</span>
                  <input value={profile.namaUsaha} onChange={setProfileField('namaUsaha')} className="adm-input" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ink-500">Nama outlet</span>
                  <input value={profile.namaOutlet} onChange={setProfileField('namaOutlet')} className="adm-input" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ink-500">Nomor WhatsApp</span>
                  <input value={profile.whatsapp} onChange={setProfileField('whatsapp')} className="adm-input" />
                  <span className="text-[11px] text-ink-400">{PROFILE_HINTS.whatsapp}</span>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ink-500">Email usaha</span>
                  <input type="email" value={profile.email} onChange={setProfileField('email')} className="adm-input" />
                </label>
                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <span className="text-xs font-medium text-ink-500">Alamat outlet</span>
                  <textarea rows={3} value={profile.alamat} onChange={setProfileField('alamat')} className="adm-input resize-none" />
                  <span className="text-[11px] text-ink-400">{PROFILE_HINTS.alamat}</span>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ink-500">Kota</span>
                  <input value={profile.kota} onChange={setProfileField('kota')} className="adm-input" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ink-500">Kode pos</span>
                  <input value={profile.kodePos} onChange={setProfileField('kodePos')} className="adm-input" />
                </label>
              </div>
            </section>

            <section className="adm-card p-4 sm:p-5">
              <h2 className="text-sm font-semibold tracking-tight text-ink-900">Jam operasional</h2>
              <p className="mt-0.5 text-xs text-ink-400">
                Jam layanan dan pengambilan cucian · Waktu Indonesia Barat
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {hours.map((h, i) => (
                  <li key={h.id} className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="w-28 text-[13px] font-medium text-ink-900">{h.label}</span>
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                      {h.status}
                    </span>
                    <input
                      type="time"
                      aria-label={`${h.label} buka`}
                      value={h.from}
                      onChange={(e) => {
                        const v = e.target.value
                        setHours((list) => list.map((row, j) => (j === i ? { ...row, from: v } : row)))
                        setJustSaved(false)
                      }}
                      className="adm-input w-32"
                    />
                    <span className="text-xs text-ink-400">sampai</span>
                    <input
                      type="time"
                      aria-label={`${h.label} tutup`}
                      value={h.to}
                      onChange={(e) => {
                        const v = e.target.value
                        setHours((list) => list.map((row, j) => (j === i ? { ...row, to: v } : row)))
                        setJustSaved(false)
                      }}
                      className="adm-input w-32"
                    />
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink-50 pt-4">
                <div>
                  <p className="text-[13px] font-medium text-ink-900">{HOURS_OUTSIDE.label}</p>
                  <p className="mt-0.5 text-xs text-ink-400">{HOURS_OUTSIDE.desc}</p>
                </div>
                <Toggle
                  checked={outside}
                  onChange={(v) => {
                    setOutside(v)
                    setJustSaved(false)
                  }}
                  label={HOURS_OUTSIDE.label}
                />
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-3">
            <section className="adm-card p-4 sm:p-5">
              <h2 className="text-sm font-semibold tracking-tight text-ink-900">Regional & satuan</h2>
              <p className="mt-0.5 text-xs text-ink-400">Digunakan pada transaksi dan laporan.</p>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  { key: 'mataUang', label: 'Mata uang' },
                  { key: 'zona', label: 'Zona waktu' },
                  { key: 'satuan', label: 'Satuan berat' },
                ].map((f) => (
                  <label key={f.key} className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-ink-500">{f.label}</span>
                    <select
                      aria-label={f.label}
                      value={regional[f.key]}
                      onChange={(e) => {
                        const v = e.target.value
                        setRegional((r) => ({ ...r, [f.key]: v }))
                        setJustSaved(false)
                      }}
                      className="adm-select"
                    >
                      {REGIONAL_OPTS[f.key].map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </section>

            <section className="adm-card p-4 sm:p-5">
              <h2 className="text-sm font-semibold tracking-tight text-ink-900">Nota & pesanan</h2>
              <p className="mt-0.5 text-xs text-ink-400">Pengaturan dasar penomoran dan tampilan.</p>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ink-500">Prefiks pesanan</span>
                  <input
                    value={nota.prefiksPesanan}
                    onChange={(e) => {
                      const v = e.target.value
                      setNota((n) => ({ ...n, prefiksPesanan: v }))
                      setJustSaved(false)
                    }}
                    className="adm-input"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ink-500">Prefiks nota</span>
                  <input
                    value={nota.prefiksNota}
                    onChange={(e) => {
                      const v = e.target.value
                      setNota((n) => ({ ...n, prefiksNota: v }))
                      setJustSaved(false)
                    }}
                    className="adm-input"
                  />
                </label>
                <label className="col-span-2 flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ink-500">Pesan pada nota</span>
                  <textarea
                    rows={2}
                    value={nota.pesan}
                    onChange={(e) => {
                      const v = e.target.value
                      setNota((n) => ({ ...n, pesan: v }))
                      setJustSaved(false)
                    }}
                    className="adm-input resize-none"
                  />
                </label>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink-50 pt-4">
                <div>
                  <p className="text-[13px] font-medium text-ink-900">Tampilkan estimasi selesai</p>
                  <p className="mt-0.5 text-xs text-ink-400">Cantumkan jadwal selesai pada nota.</p>
                </div>
                <Toggle
                  checked={nota.estimasiSelesai}
                  onChange={(v) => {
                    setNota((n) => ({ ...n, estimasiSelesai: v }))
                    setJustSaved(false)
                  }}
                  label="Tampilkan estimasi selesai"
                />
              </div>
            </section>

            <section className="adm-card p-4 sm:p-5">
              <h2 className="text-sm font-semibold tracking-tight text-ink-900">Notifikasi operasional</h2>
              <p className="mt-0.5 text-xs text-ink-400">Preferensi notifikasi untuk pemilik.</p>
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-medium text-ink-900">Pesanan siap diambil</p>
                    <p className="mt-0.5 text-xs text-ink-400">Tampilkan pemberitahuan di panel admin.</p>
                  </div>
                  <Toggle
                    checked={notif.siapDiambil}
                    onChange={(v) => {
                      setNotif((n) => ({ ...n, siapDiambil: v }))
                      setJustSaved(false)
                    }}
                    label="Pesanan siap diambil"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-ink-50 pt-4">
                  <div>
                    <p className="text-[13px] font-medium text-ink-900">Ringkasan harian</p>
                    <p className="mt-0.5 text-xs text-ink-400">Kirim ringkasan ke email usaha pukul 20.00 WIB.</p>
                  </div>
                  <Toggle
                    checked={notif.ringkasanHarian}
                    onChange={(v) => {
                      setNotif((n) => ({ ...n, ringkasanHarian: v }))
                      setJustSaved(false)
                    }}
                    label="Ringkasan harian"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      <section className="adm-card flex flex-wrap items-center justify-between gap-3 p-4 sm:px-5">
        <div>
          <p className="text-sm font-semibold tracking-tight text-ink-900">Pengaturan umum</p>
          <p className={`mt-0.5 text-xs ${dirty > 0 ? 'font-medium text-amber-600' : 'text-ink-400'}`}>
            {footerText}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={reset} disabled={dirty === 0 && !justSaved} className="adm-btn-outline disabled:opacity-50">
            Batal
          </button>
          <button type="button" onClick={save} disabled={dirty === 0} className="adm-btn-primary disabled:opacity-50">
            <IconCheck className="h-4 w-4 text-white/70" />
            Simpan perubahan
          </button>
        </div>
      </section>

      <p className="text-xs text-ink-500">{FOOTER_FIGMA}</p>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-500">
        <p>September 2026 · Outlet utama, Bandung</p>
        <p>Data ilustrasi untuk desain. Bukan data aktual.</p>
      </div>
    </div>
  )
}
