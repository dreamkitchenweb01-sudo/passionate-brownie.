import { site } from '../config/site'

// Accepts "98765 43210", "+91 9876543210", "09876543210" -> "9876543210"
export function normalisePhone(value) {
  let digits = String(value || '').replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}
export const isValidPhone = (value) => /^[6-9]\d{9}$/.test(normalisePhone(value))

// Pincode must be 6 digits and start with one of the prefixes in site.js
export function isValidPincode(value) {
  const v = String(value || '').trim()
  return /^\d{6}$/.test(v) && site.delivery.pincodePrefixes.some((p) => v.startsWith(p))
}
export const pincodePrefixText = () => site.delivery.pincodePrefixes.join(', ')

const ID_RE = new RegExp(`^(?:${site.order.idPrefix.replace('-', '')}-?)?([0-9]{1,6})$`)
export const normaliseOrderId = (value) => {
  const v = String(value || '').trim().toUpperCase().replace(/\s+/g, '')
  const m = v.match(ID_RE)
  return m ? `${site.order.idPrefix}${m[1].padStart(4, '0')}` : v
}
export const isValidOrderId = (value) => new RegExp(`^${site.order.idPrefix}[0-9]{4,6}$`).test(normaliseOrderId(value))
