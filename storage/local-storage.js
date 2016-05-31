import Realm from 'realm';

export class LocalStorage {
    constructor(schema) {
        // Set userid.
        this.realm = new Realm({
            schema: schema,
            schemaVersion: LocalStorage.schemaVersion
        });
    }
}

LocalStorage.schemaVersion = 0;