import {LocalStorage} from './local-storage';

export class LabelStorage extends LocalStorage {
    
    constructor() {
        super([LabelStorage.schema]);
    }
    
    add(data) {
        this.realm.write(() => {
            this.realm.create(LabelStorage.schema.name, data);
        });
    }
}

LabelStorage.schema = {
    name: 'Label',
    properties: {
        id: 'string',
        index: {type: 'int', default: 0, optional: true},
        owner: 'string',
        name: {type: 'string', optional: true},
        updated: 'number',
        removed: {type: 'bool', default: false, optional: true},
        recipes: {type: 'list', objectType: 'string', optional: true}
    }
}