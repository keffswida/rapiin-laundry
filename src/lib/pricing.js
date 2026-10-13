/**
 * Tabel harga. Angka saja — label/nama paket hidup di kamus i18n.
 */

export const SERVICES = ['kiloan', 'satuan', 'setrika']

export const PRICING = {
  kiloan: {
    reguler: { price: 8000, unit: 'kg' },
    ekspres: { price: 15000, unit: 'kg' },
  },
  setrika: {
    reguler: { price: 5000, unit: 'kg' },
    ekspres: { price: 8000, unit: 'kg' },
  },
  satuan: {
    item: { price: 20000, unit: 'item' },
    'item-ekspres': { price: 35000, unit: 'item' },
  },
}

export const LIMITS = {
  kiloan: { min: 1, max: 100, step: 0.5 },
  setrika: { min: 1, max: 100, step: 0.5 },
  satuan: { min: 1, max: 50, step: 1 },
}

/** Nama paket yang tersedia untuk sebuah layanan. */
export function packagesFor(service) {
  return Object.keys(PRICING[service] ?? {})
}

export function isService(value) {
  return SERVICES.includes(value)
}

export function isPackageAvailable(service, pack) {
  return Boolean(PRICING[service]?.[pack])
}

export function unitOf(service, pack) {
  return PRICING[service]?.[pack]?.unit ?? null
}

/**
 * Hitung estimasi.
 * @returns {{ok:true, total:number, price:number, unit:string}}
 *          |{{ok:false, code:string, vars?:object}}
 */
export function estimate({ service, pack, amount }) {
  if (!isService(service) || !isPackageAvailable(service, pack)) {
    return { ok: false, code: 'package_mismatch' }
  }

  const tier = PRICING[service][pack]
  const limit = LIMITS[service]
  const unit = tier.unit

  const raw = typeof amount === 'string' ? amount.replace(',', '.').trim() : amount
  if (raw === '' || raw == null) {
    return { ok: false, code: 'required' }
  }

  const value = Number(raw)
  if (!Number.isFinite(value)) {
    return { ok: false, code: unit === 'kg' ? 'weight_invalid' : 'qty_invalid' }
  }

  if (value <= 0) {
    return { ok: false, code: unit === 'kg' ? 'weight_invalid' : 'qty_invalid' }
  }

  if (unit === 'item' && !Number.isInteger(value)) {
    return { ok: false, code: 'qty_invalid' }
  }

  if (value < limit.min) {
    return { ok: false, code: unit === 'kg' ? 'weight_min' : 'qty_min', vars: { min: limit.min } }
  }

  if (value > limit.max) {
    return { ok: false, code: unit === 'kg' ? 'weight_max' : 'qty_max', vars: { max: limit.max } }
  }

  if (limit.step && Math.abs(value / limit.step - Math.round(value / limit.step)) > 1e-9) {
    return { ok: false, code: 'amount_step' }
  }

  return { ok: true, price: tier.price, unit, total: Math.round(tier.price * value) }
}
