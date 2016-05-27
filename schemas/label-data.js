import {Schema} from './schema';

export class LabelData extends Schema {
    constructor() {
        super([LabelData.schema]);
    }
}

LabelData.schema = {
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