import Realm from 'realm';

export class LocalStorage {
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
}

LocalStorage.schemaVersion = 0;

LocalStorage.realm = null;

// All schema
LocalStorage.schema = [
    {
        name: 'User',
        primaryKey: 'id',
        properties: {
            id: 'string'
        }
    },
    {
        name: 'Label',
        properties: {
            id: 'string',
            index: {type: 'int', default: 0, optional: true},
            owner: 'string',
            name: {type: 'string', optional: true},
            updated: 'int',
            removed: {type: 'bool', default: false, optional: true},
            recipes: {type: 'data', optional: true}
        }
    }
];