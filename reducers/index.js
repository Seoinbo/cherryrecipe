import {combineReducers} from 'redux';
import * as deviceReducer from './device';

export default combineReducers( Object.assign(
    deviceReducer
));