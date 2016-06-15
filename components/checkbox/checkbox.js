import React, {
    Component,
    StyleSheet,
    PropTypes,
    Text,
    View,
    Animated
} from 'react-native';

import ViewObject from '../view-object/view-object';
import Icon from '../icon/icon';

/**
 * Checkbox Component
 * @example <Checkbox value="3" checked={true} disabled={true}/>
 */
class Checkbox extends ViewObject {
    static propTypes = {
        value: PropTypes.string.isRequired,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onCheck: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);
    }
}

export default Checkbox;