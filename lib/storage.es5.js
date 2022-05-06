var key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
function keyAt(key, i) {
    return key.charCodeAt(~~(i % key.length));
}
/**加密数字数组为字符串 */
function encode(data) {
    var o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0, enc = '';
    if (!data) {
        return data;
    }
    do {
        o1 = data[i++];
        o2 = data[i++];
        o3 = data[i++];
        bits = (o1 << 16) | (o2 << 8) | o3;
        h1 = (bits >> 18) & 0x3f;
        h2 = (bits >> 12) & 0x3f;
        h3 = (bits >> 6) & 0x3f;
        h4 = bits & 0x3f;
        enc += key.charAt(h1) + key.charAt(h2) + key.charAt(h3) + key.charAt(h4);
    } while (i < data.length);
    r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}
/**解密字符串 */
function decode(data) {
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, result = [];
    if (!data) {
        return data;
    }
    data += '';
    do {
        h1 = key.indexOf(data.charAt(i++));
        h2 = key.indexOf(data.charAt(i++));
        h3 = key.indexOf(data.charAt(i++));
        h4 = key.indexOf(data.charAt(i++));
        bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;
        o1 = (bits >> 16) & 0xff;
        o2 = (bits >> 8) & 0xff;
        o3 = bits & 0xff;
        result.push(o1);
        if (h3 !== 64) {
            result.push(o2);
            if (h4 !== 64)
                result.push(o3);
        }
    } while (i < data.length);
    return result;
}
/**字符串转加密 charCode 数组 */
function incry(string, key) {
    string = encodeURIComponent(string);
    var i = 0, l = string.length, res = [];
    for (; i < l; i++)
        res[i] = string[i].charCodeAt(0) ^ keyAt(key, i);
    return encode(res);
}
/**解密字符串 */
function decyt(string, key) {
    var array = decode(string);
    var arr = Array.from({ length: array.length });
    var i = 0, l = arr.length;
    for (; i < l; i++)
        arr[i] = String.fromCharCode(array[i] ^ keyAt(key, i));
    return decodeURIComponent(arr.join(''));
}

var customStorage = {
    length: 0,
    data: [],
    /**清理存储对象 */
    clear: function () {
        this.data = [];
    },
    getItem: function (key) {
        var item = this.data.find(function (i) { return i.key === key; });
        if (item)
            return item.value;
        return null;
    },
    key: function (index) {
        if (index > this.length - 1 || index < 0)
            return null;
        return this.data[index].key;
    },
    /**移除 key */
    removeItem: function (key) {
        var item = this.data.find(function (i) { return i.key === key; });
        if (item) {
            this.data.splice(item.index, 1);
        }
    },
    /**设置key value */
    setItem: function (key, value) {
        var item = this.data.find(function (i) { return i.key === key; });
        if (item) {
            item.value = value;
        }
        else {
            this.data.push({
                key: key,
                value: value,
                index: this.data.length
            });
        }
    }
};
Object.defineProperty(customStorage, 'length', {
    get: function () {
        return customStorage.data.length;
    },
    enumerable: false
});

var isServer = typeof window === 'undefined';
var SN = '@suporka/storage_';
var EncryptStorage = /** @class */ (function () {
    function EncryptStorage(options) {
        this.options = {
            type: 'localStorage',
            encrypt: ''
        };
        if (options) {
            this.options = Object.assign(this.options, options);
        }
        this.adapter = isServer ? customStorage : window[this.options.type];
    }
    /**获取 key */
    EncryptStorage.prototype.getKey = function (key) {
        if (this.options.encrypt) {
            return SN + incry(key, this.options.encrypt);
        }
        return key;
    };
    /**获取 value */
    EncryptStorage.prototype.getValue = function (string) {
        if (string === null)
            return null;
        if (this.options.encrypt) {
            string = decyt(string, this.options.encrypt);
        }
        try {
            // 解析
            string = JSON.parse(string);
        }
        catch (e) {
            return string;
        }
        return string;
    };
    /**设置值 */
    EncryptStorage.prototype.setValue = function (data) {
        data = data && typeof data === 'object' ? JSON.stringify(data) : data + '';
        if (this.options.encrypt) {
            data = incry(data, this.options.encrypt);
        }
        return data;
    };
    /**获取存储数据 */
    EncryptStorage.prototype.get = function (name) {
        var key = this.getKey(name);
        return this.getValue(this.adapter.getItem(key));
    };
    /**存储数据 */
    EncryptStorage.prototype.set = function (name, data) {
        this.adapter.setItem(this.getKey(name), this.setValue(data));
    };
    /**移除单个数据 */
    EncryptStorage.prototype.remove = function (name) {
        this.adapter.removeItem(this.getKey(name));
    };
    /**移除所有数据 */
    EncryptStorage.prototype.clear = function () {
        this.adapter.clear();
    };
    return EncryptStorage;
}());

export { customStorage, decyt, EncryptStorage as default, incry };
//# sourceMappingURL=storage.es5.js.map
