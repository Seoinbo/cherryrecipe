import {LocalStorage} from './local-storage';

export class UserStorage extends LocalStorage {
    constructor() {
        super([UserStorage.schema]);
    }
}

UserStorage.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'string'
    }
}