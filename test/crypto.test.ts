import { incry, decyt } from '../src/crypto'

describe('测试 crypto', () => {
  test('测试加密解密英文', () => {
    const text = 'my name is suporka'
    const key = 'key'
    const cryptoText = incry(text, key)
    const decytText = decyt(cryptoText, key)
    expect(text === decytText).toBeTruthy()
  })

  test('测试加密解密中文', () => {
    const text = '搜索'
    const key = 'key'
    const cryptoText = incry(text, key)
    const decytText = decyt(cryptoText, key)
    expect(text === decytText).toBeTruthy()
  })

  test('测试加密解密json字符串', () => {
    const text = JSON.stringify({
      name: 'suporka',
      age: 28,
      school: 'scau',
      like: ['apple', 'iphone']
    })
    const key = 'key'
    const cryptoText = incry(text, key)
    const decytText = decyt(cryptoText, key)
    expect(text === decytText).toBeTruthy()
  })

  test('测试加密解密超长字符串', () => {
    const text = 'sfajkj但是（）-=-=-=（）（）发放和+asdfs*/*/*/*/*'.repeat(10)
    const key = 'key'
    const cryptoText = incry(text, key)
    const decytText = decyt(cryptoText, key)
    expect(text === decytText).toBeTruthy()
  })
})