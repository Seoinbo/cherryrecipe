export const KEYBOARD_WILL_SHOW = 'keyboardWillShow';
export const KEYBOARD_WILL_HIDE = 'keyboardWillHide';

export function keyboardWillShow(event) {
    console.log("e: ", event);
    return {
        type: KEYBOARD_WILL_SHOW,
        event
    }
}

export function keyboardWillHide(event) {
    return {
        type: KEYBOARD_WILL_HIDE,
        event
    }
}