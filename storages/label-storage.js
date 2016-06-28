import LocalStorage from './local-storage';
import {Util} from '../services/util';

class LabelStorage extends LocalStorage {
    constructor() {
        super();
    }
    
    add(data) {
        if (data.index === undefined) {
           data.index = this.nextIndex;
        }
        let newData = Object.assign({
            id: this.createID(data.owner),
            updated: this.now
        }, data);
        super.add(newData);
    }
        
    createID(userid) {
        return userid + '-L' + Util.uniqID();
    }

    // @override
    get name() {
        return 'Label';
    }
}

export default LabelStorage;