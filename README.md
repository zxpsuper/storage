# storage

To operate storage simply!

storage 管理工具

## Getting started

### use it in html

```html
<script src="https://unpkg.com/@suporka/storage@1.0.0/lib/storage.umd.js"></script>
<script>
  const app = new storage({
    type: 'localStorage',
    encrypt: 'localStorage'
  })

  app.set('name', 'suporka')

  app.get('name') // suporka

  app.remove('name') // remove a key

  app.clear() // clear all

  // crypto
  storage.incry('text', 'key') // HwABHw==
  // decrypto
  storage.decyt('HwABHw==', 'key') // text
</script>
```

### use it by npm

```
npm i @suporka/storage --save
```

```js
import storage, { incry, decyt } from '@suporka/storage'

const app = new storage({
  type: 'localStorage',
  encrypt: 'localStorage'
})

app.set('name', 'suporka')

app.get('name') // suporka

app.remove('name') // remove a key

app.clear() // clear all

// crypto
incry('text', 'key') // HwABHw==
// decrypto
decyt('HwABHw==', 'key') // text
```

## Questions or advise
If you have some question or advise, you can send me a E-mail，or create a [issue](https://github.com/zxpsuper/storage/issues/new).