import Realm from 'realm';
import {Util} from '../services/util';

class LocalStorage {
    constructor() {
        // Set userid.
        if (LocalStorage.realm == null) {
            LocalStorage.realm = new Realm({
                schema: LocalStorage.schema,
                schemaVersion: LocalStorage.schemaVersion
            });
        }
    }

    get realm() {
        return LocalStorage.realm;
    }

    add(data) {
        this.realm.write(() => {
            this.realm.create(this.name, data);
        });
    }

    update(id, data) {
        let newData = Object.assign({
            id: id,
            updated: Util.toUnixTimestamp(Util.now())
        }, data);
        this.realm.write( () => {
            this.realm.create(this.name, newData, true);
        });
    }

    delete(id) {
        let object = this.realm.objects(this.name).filtered('id = $0', id);
        this.realm.write(() => {
            try {
                this.realm.delete(object);
            } catch(e) {
                
            }
        });
    }

    get now() {
        return Util.toUnixTimestamp(Util.now());
    }

    get nextIndex() {
        let index;
        try {
            index = this.realm.objects(this.name).length;
        } catch (e) {
            index = 0;
        }
        return index;
    }

    get name() {
        return null;
    }

}

LocalStorage.schemaVersion = 2;

LocalStorage.realm = null;

// All schema
LocalStorage.schema = [
    {
        name: 'User',
        primaryKey: 'id',
        properties: {
            id: 'string',
            updated: 'int'
        }
    },
    {
        name: 'Label',
        primaryKey: 'id',
        properties: {
            id: 'string',
            index: {type: 'int', default: 0, optional: true},
            owner: 'string',
            name: {type: 'string', optional: true},
            updated: 'int',
            removed: {type: 'bool', default: false, optional: true},
            recipes: {type: 'data', optional: true}
        }
    },
    {
        name: 'Recipe',
        primaryKey: 'id',
        properties: {
            id: 'string',
            index: {type: 'int', default: 0, optional: true},
            owner: 'string',
            title: {type: 'string', optional: true},
            updated: 'int',
            removed: {type: 'bool', default: false, optional: true},
            items: {type: 'data', optional: true}
        }
    }
];

export default LocalStorage;