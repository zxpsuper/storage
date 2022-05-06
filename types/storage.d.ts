import { incry, decyt } from './crypto';
import customStorage from './customStorage';
declare type StorageOption = {
    type: 'localStorage' | 'sessionStorage';
    encrypt: string;
};
declare class EncryptStorage {
    /**储存实际对象 */
    private adapter;
    private options;
    constructor(options?: StorageOption);
    /**获取 key */
    private getKey;
    /**获取 value */
    private getValue;
    /**设置值 */
    private setValue;
    /**获取存储数据 */
    get(name: string): any;
    /**存储数据 */
    set(name: string, data: any): void;
    /**移除单个数据 */
    remove(name: string): void;
    /**移除所有数据 */
    clear(): void;
}
export default EncryptStorage;
export { customStorage, incry, decyt };
