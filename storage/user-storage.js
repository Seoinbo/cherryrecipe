import {LocalStorage} from './local-storage';

export class UserStorage extends LocalStorage {
    constructor() {
        super();
        this._userid = "g1625346125341653";
    }
    
    get name() {
        return 'User';
    }
    
    get userid() {
        return this._userid;
    }
}