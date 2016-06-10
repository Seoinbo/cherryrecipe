export class Util {
    static now(nocache = false) {
        return new Date().getTime();
    }
    
    // @param number timestamp - javascript timestamp
    static uniqID(timestamp) {
        if (typeof timestamp === 'undefined') {
            timestamp = Util.now();
        }
        return timestamp.toString(36).toLowerCase();
    }

    // 자바스크립트 타임스템프 값을 유닉스 타임스템프 값으로 변환 반환.
    static toUnixTimestamp(jsTimestamp) {
        return Math.round(jsTimestamp / 1000);
    }

    static json2Array(objects) {
        let objectArray = [];
        for (let key in objects) {
            let item = objects[key];
            item._key = key;
            objectArray.push(item);
        }
        return objectArray;
    }

    static apply(callback, parameter = [], context = null) {
        if (typeof callback === "function") {
            callback.apply(context, parameter);
        }
    }

    static lazyApply(count, length, callback, parameter = [], context = null) {
        if (++count >= length) {
            Util.apply(callback, parameter, context);
        }
    }

    // Compare two objects.
    // @param json src
    // @param json dest
    // @param array includes (optional)
    // @param array excludes (optional) 
    static isEqual(src, dest, includes, excludes) {
        for (let key in src) {
            if (includes && includes.indexOf(key) == -1) {
                continue;
            }
            if (excludes && excludes.indexOf(key) > -1) {
                continue;
            }
            if (!src.hasOwnProperty || !src.hasOwnProperty(key)) {
                continue;
            }
            if (typeof src[key] === "undefined") {
				continue;
			} else if (Object.prototype.toString.call(src[key]) === "[object Object]") {
				if (!this.isEqual(src[key], dest[key], includes, excludes)) {
                    return false;
                }
			} else {
				if (src[key] != dest[key]) {
                    return false;
                }
			}
        }
        return true;
    }

    static removeArrayElementByValue(array, value) {
        let index = array.indexOf(value);
        if (index >= 0) {
          array.splice(index, 1);
        }
        return array;
    }
}

export class String {
    static trim(str) {
    	return str.replace(/^\s+|\s+$/g, "");
    }

    static toCamelCase(str) {
        return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
    }

    static toDashed(str) {
        return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
    }

    static toUnderscore(str) {
    	return str.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
    }

    static getFunctionName(str) {
        let temp = str.match(/^function (\w*)/);
        if (temp == null) {
            return null;
        }
        return temp[1];
    }
}
