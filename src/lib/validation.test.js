import { describe, expect, it } from 'vitest'
import {
  isValidPhone,
  normalizePhone,
  parseDate,
  slotHour,
  validateBooking,
} from './validation'

const NOW = new Date(2026, 9, 9, 9, 30) // 9 Okt 2026, 09.30

const base = {
  name: 'Sari Rahmawati',
  phone: '081234567890',
  address: 'Jl. Melati Raya No. 12, dekat warung kopi',
  service: 'kiloan',
  pack: 'reguler',
  amount: '4',
  date: '2026-10-10',
  time: '10.00',
  notes: '',
  honeypot: '',
}

const errorsOf = (form, now = NOW) => validateBooking(form, { now }).errors

describe('normalizePhone / isValidPhone', () => {
  it('menormalkan berbagai format ke +62', () => {
    expect(normalizePhone('0812 3456 7890')).toBe('+6281234567890')
    expect(normalizePhone('62812-3456-7890')).toBe('+6281234567890')
    expect(normalizePhone('+62 812 3456 7890')).toBe('+6281234567890')
    expect(normalizePhone('81234567890')).toBe('+6281234567890')
  })

  it('menolak nomor yang tidak valid', () => {
    expect(isValidPhone('0812')).toBe(false)
    expect(isValidPhone('051234567890')).toBe(false)
    expect(isValidPhone('081234567890123456')).toBe(false)
    expect(isValidPhone('halo')).toBe(false)
    expect(isValidPhone('')).toBe(false)
    expect(isValidPhone('081234567890')).toBe(true)
    expect(isValidPhone('+6281234567890')).toBe(true)
  })
})

describe('slotHour / parseDate', () => {
  it('mengurai jam', () => {
    expect(slotHour('08.00')).toBe(8)
    expect(slotHour('8:00')).toBe(8)
    expect(slotHour('08.30')).toBeNull()
    expect(slotHour('abc')).toBeNull()
    expect(slotHour('')).toBeNull()
  })

  it('menolak tanggal rusak', () => {
    expect(parseDate('2026-02-30')).toBeNull()
    expect(parseDate('2026-13-01')).toBeNull()
    expect(parseDate('10/10/2026')).toBeNull()
    expect(parseDate('2026-10-10')?.getDate()).toBe(10)
  })
})

describe('validateBooking — happy path', () => {
  it('form lengkap lolos', () => {
    const result = validateBooking(base, { now: NOW })
    expect(result.errors).toEqual({})
    expect(result.valid).toBe(true)
    expect(result.spam).toBe(false)
  })

  it('layanan setrika dengan paket reguler lolos', () => {
    expect(errorsOf({ ...base, service: 'setrika', amount: '2.5' })).toEqual({})
  })

  it('layanan satuan dengan paket item lolos', () => {
    expect(errorsOf({ ...base, service: 'satuan', pack: 'item', amount: '3' })).toEqual({})
  })
})

describe('validateBooking — negative', () => {
  it('semua field wajib kosong', () => {
    const errors = errorsOf({
      name: '',
      phone: '',
      address: '',
      service: '',
      pack: '',
      amount: '',
      date: '',
      time: '',
      honeypot: '',
    })
    expect(Object.keys(errors).sort()).toEqual(
      ['address', 'amount', 'date', 'name', 'pack', 'phone', 'service', 'time'],
    )
    expect(errors.name.code).toBe('required')
    expect(errors.date.code).toBe('required')
  })

  it('nama tidak valid', () => {
    expect(errorsOf({ ...base, name: 'A' }).name.code).toBe('name_min')
    expect(errorsOf({ ...base, name: '12345' }).name.code).toBe('name_invalid')
    expect(errorsOf({ ...base, name: 'x'.repeat(81) }).name.code).toBe('name_max')
    expect(errorsOf({ ...base, name: '  Sari  ' })).toEqual({})
  })

  it('telepon tidak valid', () => {
    expect(errorsOf({ ...base, phone: '0812' }).phone.code).toBe('phone_invalid')
    expect(errorsOf({ ...base, phone: 'halo' }).phone.code).toBe('phone_invalid')
    expect(errorsOf({ ...base, phone: '+6281234567890' })).toEqual({})
  })

  it('alamat terlalu pendek / terlalu panjang', () => {
    expect(errorsOf({ ...base, address: 'Jl. A' }).address.code).toBe('address_min')
    expect(errorsOf({ ...base, address: 'x'.repeat(201) }).address.code).toBe('address_long')
  })

  it('berat tidak valid', () => {
    expect(errorsOf({ ...base, amount: '0.4' }).amount.code).toBe('weight_min')
    expect(errorsOf({ ...base, amount: '101' }).amount.code).toBe('weight_max')
    expect(errorsOf({ ...base, amount: '1.3' }).amount.code).toBe('amount_step')
    expect(errorsOf({ ...base, amount: 'banyak' }).amount.code).toBe('weight_invalid')
    expect(errorsOf({ ...base, amount: '' }).amount.code).toBe('required')
  })

  it('jumlah item harus bulat', () => {
    const errors = errorsOf({ ...base, service: 'satuan', pack: 'item', amount: '2.5' })
    expect(errors.amount.code).toBe('qty_invalid')
  })

  it('paket tidak cocok dengan layanan', () => {
    expect(errorsOf({ ...base, service: 'satuan', pack: 'reguler' }).pack.code).toBe(
      'package_mismatch',
    )
    expect(errorsOf({ ...base, pack: 'hemat' }).pack.code).toBe('package_mismatch')
  })

  it('tanggal salah', () => {
    expect(errorsOf({ ...base, date: '2026-10-08' }).date.code).toBe('date_past')
    expect(errorsOf({ ...base, date: '2026-11-01' }).date.code).toBe('date_far')
    expect(errorsOf({ ...base, date: '2026-02-30' }).date.code).toBe('date_invalid')
    expect(errorsOf({ ...base, date: '2026-10-09' })).toEqual({})
  })

  it('jam di luar slot operasional', () => {
    expect(errorsOf({ ...base, time: '05.00' }).time.code).toBe('time_closed')
    expect(errorsOf({ ...base, time: '22.00' }).time.code).toBe('time_closed')
    expect(errorsOf({ ...base, time: '07.00' }).time.code).toBe('time_closed')
    expect(errorsOf({ ...base, time: '07:30' }).time.code).toBe('time_closed')
    expect(errorsOf({ ...base, time: 'garbage' }).time.code).toBe('time_closed')
  })

  it('slot hari ini yang sudah lewat', () => {
    // NOW = 09.30 → slot 08.00 sudah lewat, 10.00 masih boleh
    expect(errorsOf({ ...base, date: '2026-10-09', time: '08.00' }).time.code).toBe('time_past')
    expect(errorsOf({ ...base, date: '2026-10-09', time: '10.00' })).toEqual({})
    // tepat jam berjalan (09.00 slot tidak ada; uji jam == current hour via slot 08 tetap past)
    expect(errorsOf({ ...base, date: '2026-10-09', time: '06.00' }).time.code).toBe('time_past')
  })

  it('catatan terlalu panjang', () => {
    expect(errorsOf({ ...base, notes: 'x'.repeat(501) }).notes.code).toBe('note_long')
    expect(errorsOf({ ...base, notes: 'x'.repeat(500) })).toEqual({})
  })
})

describe('validateBooking — honeypot', () => {
  it('form valid + honeypot terisi = spam, tapi tidak error', () => {
    const result = validateBooking({ ...base, honeypot: 'https://bot' }, { now: NOW })
    expect(result.valid).toBe(true)
    expect(result.spam).toBe(true)
  })
})
