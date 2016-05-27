import {Schema} from './schema';

export class UserData extends Schema {
    constructor() {
        super([UserData.schema]);
    }
}

UserData.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'string'
    }
}