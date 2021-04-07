/**
 * Parse a price string to number.
 *
 * @param {string} priceString
 * @returns {number}
 */
export function parsePriceStringToNumber (priceString) {
  return priceString.replace(/\D/g, '') / 100
}
