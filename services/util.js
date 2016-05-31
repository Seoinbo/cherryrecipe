export class Util {
    static now(nocache = false) {
        return new Date().getTime();
    }
    
    // @param number timestamp - javascript timestamp
    static uniqID(timestamp): string {
        if (typeof timestamp === 'undefined') {
            timestamp = Util.now();
        }
        return timestamp.toString(36).toLowerCase();
    }

};