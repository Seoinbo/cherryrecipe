import { TextInput } from 'react-native';
const {State: TextInputState} = TextInput;

export function hideKeyboard() {
    TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
}