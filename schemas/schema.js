import Realm from 'realm';
import {LocalStorage} from '../services/local-storage';

export class Schema {
    constructor(schema) {
        // Set userid.
        this.realm = new Realm({
            schema: schema,
            schemaVersion: LocalStorage.schemaVersion
        });
    }
}