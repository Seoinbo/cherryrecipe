import LocalStorage from './local-storage';

export class UserStorage extends LocalStorage {
    constructor() {
        super();
        this._userid = "G1625346125341653";
    }
    
    // @override
    get name() {
        return 'User';
    }
    
    get userid() {
        return this._userid;
    }
}