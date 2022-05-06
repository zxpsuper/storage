import storage from '../src/storage'

describe('测试 storage', () => {
  test('测试不加密', () => {
    const app = new storage()
    app.set('name', 'suporka')
    expect(app.get('name') === 'suporka').toBeTruthy()
    app.remove('name')
    expect(app.get('name') === null).toBeTruthy()
  })

  test('测试模拟window', () => {
    const app = new storage()
    app.set('name', 'suporka')
    expect(app.get('name') === 'suporka').toBeTruthy()
    app.remove('name')
    expect(app.get('name') === null).toBeTruthy()
  })
  test('测试加密', () => {
    const app = new storage({
      type: 'localStorage',
      encrypt: 'localStorage'
    })
    app.set('name', 'suporka')
    expect(app.get('name') === 'suporka').toBeTruthy()
    app.remove('name')
    expect(app.get('name') === null).toBeTruthy()
    app.set('name', {a: 1})
    expect(app.get('name').a === 1).toBeTruthy()
    app.clear()
    expect(app.get('name') === null).toBeTruthy()
  })

})