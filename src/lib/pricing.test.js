import { describe, expect, it } from 'vitest'
import { estimate, isPackageAvailable, packagesFor } from './pricing'

describe('estimate', () => {
  it('menghitung kiloan reguler', () => {
    const r = estimate({ service: 'kiloan', pack: 'reguler', amount: '4' })
    expect(r).toMatchObject({ ok: true, total: 32000, price: 8000, unit: 'kg' })
  })

  it('menghitung desimal 0,5 kg', () => {
    const r = estimate({ service: 'kiloan', pack: 'ekspres', amount: '1.5' })
    expect(r.ok).toBe(true)
    expect(r.total).toBe(22500)
  })

  it('menerima koma sebagai pemisah desimal', () => {
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: '2,5' }).total).toBe(20000)
  })

  it('menolak satuan non-bulat', () => {
    const r = estimate({ service: 'satuan', pack: 'item', amount: '2.5' })
    expect(r).toEqual({ ok: false, code: 'qty_invalid' })
  })

  it('menolak berat di bawah batas', () => {
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: '0.5' })).toEqual({
      ok: false,
      code: 'weight_min',
      vars: { min: 1 },
    })
  })

  it('menolak berat melebihi batas', () => {
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: '150' })).toEqual({
      ok: false,
      code: 'weight_max',
      vars: { max: 100 },
    })
  })

  it('menolak kelipatan selain 0,5', () => {
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: '1.3' }).code).toBe('amount_step')
  })

  it('menolak input kosong', () => {
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: '  ' }).code).toBe('required')
  })

  it('menolak angka bukan angka', () => {
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: 'abc' }).code).toBe('weight_invalid')
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: 'Infinity' }).code).toBe(
      'weight_invalid',
    )
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: 'NaN' }).code).toBe(
      'weight_invalid',
    )
  })

  it('menolak nol dan angka negatif', () => {
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: '0' }).code).toBe('weight_invalid')
    expect(estimate({ service: 'kiloan', pack: 'reguler', amount: '-4' }).code).toBe(
      'weight_invalid',
    )
  })

  it('menolak paket yang tidak tersedia untuk layanan', () => {
    expect(estimate({ service: 'satuan', pack: 'reguler', amount: '3' })).toEqual({
      ok: false,
      code: 'package_mismatch',
    })
    expect(estimate({ service: 'kiloan', pack: 'item', amount: '3' }).code).toBe('package_mismatch')
  })

  it('menolak layanan tak dikenal', () => {
    expect(estimate({ service: 'dry-clean', pack: 'reguler', amount: '3' }).code).toBe(
      'package_mismatch',
    )
  })

  it('menghitung item satuan tanpa batas desimal', () => {
    const r = estimate({ service: 'satuan', pack: 'item', amount: '50' })
    expect(r.total).toBe(1000000)
    expect(estimate({ service: 'satuan', pack: 'item', amount: '51' }).code).toBe('qty_max')
  })
})

describe('packagesFor / isPackageAvailable', () => {
  it('kiloan punya reguler dan ekspres', () => {
    expect(packagesFor('kiloan')).toEqual(['reguler', 'ekspres'])
    expect(packagesFor('satuan')).toEqual(['item', 'item-ekspres'])
    expect(packagesFor('setrika')).toEqual(['reguler', 'ekspres'])
  })

  it('layanan tak dikenal tidak punya paket', () => {
    expect(packagesFor('hemat')).toEqual([])
    expect(isPackageAvailable('hemat', 'reguler')).toBe(false)
  })
})
