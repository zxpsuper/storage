declare type StorageItem = {
    index: number;
    value: string;
    key: string;
};
declare const customStorage: Storage & {
    data: StorageItem[];
};
export default customStorage;
