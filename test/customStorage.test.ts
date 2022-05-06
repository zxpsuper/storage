import customStorage from '../src/customStorage'

describe('测试 crypto', () => {
  test('测试 setItem ', () => {
    customStorage.setItem('name', 'suporka')
    expect(customStorage.data[0].key === 'name' && customStorage.data[0].value === 'suporka').toBeTruthy()
  })
  test('测试重复setItem ', () => {
    customStorage.setItem('name', 'suporka')
    customStorage.setItem('name', 'suporka')
    expect(customStorage.data[0].key === 'name' && customStorage.data[0].value === 'suporka').toBeTruthy()
    expect(customStorage.data.length === 1).toBeTruthy()
  })

  test('测试 clear ', () => {
    customStorage.setItem('name', 'suporka')
    customStorage.clear()
    expect(customStorage.data.length === 0).toBeTruthy()
  })

  test('测试 getItem ', () => {
    customStorage.setItem('name', 'suporka')
    customStorage.setItem('name1', 'suporka1')
    expect(customStorage.getItem('name') === 'suporka').toBeTruthy()
    customStorage.clear()
    customStorage.getItem('name')
    expect(customStorage.getItem('name') === null).toBeTruthy()
  })

  test('测试 removeItem ', () => {
    customStorage.clear()
    customStorage.setItem('name', 'suporka')
    expect(customStorage.getItem('name') === 'suporka').toBeTruthy()
    customStorage.removeItem('name')
    customStorage.removeItem('name2')
    expect(customStorage.getItem('name') === null).toBeTruthy()
  })

  test('测试 key ', () => {
    customStorage.clear()
    customStorage.setItem('name', 'suporka')
    customStorage.setItem('name1', 'suporka1')
    expect(customStorage.key(0) === 'name').toBeTruthy()
    expect(customStorage.key(1) === 'name1').toBeTruthy()
    expect(customStorage.key(8) === null).toBeTruthy()
    expect(customStorage.key(-1) === null).toBeTruthy()
  })


  test('测试 length ', () => {
    customStorage.clear()
    customStorage.setItem('name', 'suporka')
    customStorage.setItem('name1', 'suporka1')
    expect(customStorage.length === 2).toBeTruthy()
  })
})