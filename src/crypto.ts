const key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

export function keyAt(key: string, i: number) {
  return key.charCodeAt(~~(i % key.length))
}

/**加密数字数组为字符串 */
export function encode(data: Array<number>): string {
  let o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    r,
    i = 0,
    enc = ''
  if (!data) {
    return data
  }
  do {
    o1 = data[i++]
    o2 = data[i++]
    o3 = data[i++]
    bits = (o1 << 16) | (o2 << 8) | o3
    h1 = (bits >> 18) & 0x3f
    h2 = (bits >> 12) & 0x3f
    h3 = (bits >> 6) & 0x3f
    h4 = bits & 0x3f
    enc += key.charAt(h1) + key.charAt(h2) + key.charAt(h3) + key.charAt(h4)
  } while (i < data.length)
  r = data.length % 3
  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
}

/**解密字符串 */
export function decode(data: any): number[] {
  let o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    result = []
  if (!data) {
    return data
  }
  data += ''
  do {
    h1 = key.indexOf(data.charAt(i++))
    h2 = key.indexOf(data.charAt(i++))
    h3 = key.indexOf(data.charAt(i++))
    h4 = key.indexOf(data.charAt(i++))
    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4
    o1 = (bits >> 16) & 0xff
    o2 = (bits >> 8) & 0xff
    o3 = bits & 0xff
    result.push(o1)
    if (h3 !== 64) {
      result.push(o2)
      if (h4 !== 64) result.push(o3)
    }
  } while (i < data.length)
  return result
}

/**字符串转加密 charCode 数组 */
export function incry(string: string, key: string): string {
  string = encodeURIComponent(string)
  let i = 0,
    l = string.length,
    res = []
  for (; i < l; i++) res[i] = string[i].charCodeAt(0) ^ keyAt(key, i)
  return encode(res)
}

/**解密字符串 */
export function decyt(string: string, key: string): string {
  const array: number[] = decode(string)
  const arr: string[] = Array.from({ length: array.length })
  let i = 0,
    l = arr.length
  for (; i < l; i++) arr[i] = String.fromCharCode(array[i] ^ keyAt(key, i))
  return decodeURIComponent(arr.join(''))
}