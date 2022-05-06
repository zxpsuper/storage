import { incry, decyt } from './crypto'
import customStorage from './customStorage'


type StorageOption = {
  type: 'localStorage' | 'sessionStorage'
  encrypt: string
}

const isServer = typeof window === 'undefined'

const SN = '@suporka/storage_' 


class EncryptStorage {
  /**储存实际对象 */
  private adapter: Storage
  private options: StorageOption = {
    type: 'localStorage',
    encrypt: ''
  }
  
  constructor(options?: StorageOption) {
    if (options) {
      this.options = Object.assign(this.options, options)
    }
    this.adapter = isServer ? customStorage : window[this.options.type]
  }

  /**获取 key */
  private getKey(key: string) {
    if (this.options.encrypt) {
      return SN + incry(key, this.options.encrypt)
    }
    return key
  }

  /**获取 value */
  private getValue(string: string | null | any) {
    if (string === null) return null
    if (this.options.encrypt) {
      string = decyt(string, this.options.encrypt)
    }
    try {
      // 解析
      string = JSON.parse(string)
    } catch (e) {
      return string
    }
    return string
  }
  /**设置值 */
  private setValue(data: any) {
    data = data && typeof data === 'object' ? JSON.stringify(data) : data + ''
    if (this.options.encrypt) {
      data = incry(data, this.options.encrypt)
    }
    return data 
  }

  /**获取存储数据 */
  public get(name: string) {
    const key = this.getKey(name)
    return this.getValue(this.adapter.getItem(key))
  }

  /**存储数据 */
  public set(name: string, data: any) {
    this.adapter.setItem(this.getKey(name), this.setValue(data))
  }
  /**移除单个数据 */
  public remove(name: string) {
    this.adapter.removeItem(this.getKey(name))
  }
  /**移除所有数据 */
  public clear() {
    this.adapter.clear()
  }
}

export default EncryptStorage;

export {
  customStorage, incry, decyt
}