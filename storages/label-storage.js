import {LocalStorage} from './local-storage';
import {Util} from '../services/util';

export class LabelStorage extends LocalStorage {
    constructor() {
        super();
    }
    
    add(labelData) {
        let index;
        if (labelData.index === undefined) {
            try {
                index = this.realm.objects(this.name).length;
            } catch (e) {
                index = 0;
            }
        }
        let data = Object.assign({
            id: this.createID(labelData.owner),
            index: index,
            updated: Util.toUnixTimestamp(Util.now())
        }, labelData);
        this.realm.write(() => {
            this.realm.create(this.name, data);
        });
    }
    
    delete(labelID) {
        let label = this.realm.objects(this.name).filtered('id = $0', labelID);
        this.realm.write(() => {
            try {
                this.realm.delete(label);
            } catch(e) {
                
            }
            
        });
    }
    
    createID(userid) {
        return userid + '-l' + Util.uniqID();
    }
    
    get name() {
        return 'Label';
    }
}