type StorageItem = {
  index: number
  value: string
  key: string
}
const customStorage: Storage & { data: StorageItem[] } = {
  length: 0, // 对象长度
  data: [], // 存储对象
  /**清理存储对象 */
  clear() {
    this.data = []
  },
  getItem(key: string) {
    const item = this.data.find((i) => i.key === key)
    if (item) return item.value
    return null
  },
  key(index: number) {
    if (index > this.length - 1 || index < 0) return null
    return this.data[index].key
  },
  /**移除 key */
  removeItem(key: string) {
    const item = this.data.find((i) => i.key === key)
    if (item) {
      this.data.splice(item.index, 1)
    }
  },
  /**设置key value */
  setItem(key: string, value: string) {
    const item = this.data.find((i) => i.key === key)
    if (item) {
      item.value = value
    } else {
      this.data.push({
        key,
        value,
        index: this.data.length
      })
    }
  }
}

Object.defineProperty(customStorage, 'length', {
  get() {
    return customStorage.data.length
  },
  enumerable: false
})
export default customStorage