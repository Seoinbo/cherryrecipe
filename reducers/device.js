import {
    KEYBOARD_WILL_SHOW,
    KEYBOARD_WILL_HIDE
} from '../actions/device';

const keyboardInitailState = {
    endCoordinates: {
        width: 0,
        height: 0
    }
}
export function keyboardState(state = keyboardInitailState, action) {
    switch (action.type) {
        case KEYBOARD_WILL_SHOW:
            if (action.event) {
                state = action.event;
            } else {
                state.endCoordinates.height = 280;
            }
            return state;

        case KEYBOARD_WILL_HIDE:
        default:
            return keyboardInitailState; 
    }
}