import hexRgb from 'hex-rgb'
import rgbHex from 'rgb-hex'
import slugify from 'slugify'

export const slug = (text: string) =>
  slugify(text, { lower: true, trim: false, remove: /[^A-Za-zÀ-ÖØ-öø-ÿ0-9 ]/ })

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

export const rgbToHex = (rgb?: string | null) => (rgb ? '#' + rgbHex(rgb) : '')
export const hexToRgb = (hex?: string | null) =>
  hex ? hexRgb(hex, { format: 'css' }).replace('rgb(', '').replace(')', '') : ''
