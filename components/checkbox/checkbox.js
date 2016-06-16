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

    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({}, this.state, {
            animateIconScale: new Animated.Value(0)
        });
    }

    render() {
        let {
            checked,
            disabled,
            value
        } = this.props;

        return (
            <View style={[this.props.style, styles.checkbox]}>
                <View style={styles.box}>
                    <Animated.Icon style={[styles.icon, {transform: this.state.animateIconScale.getTranslateTransform()}]} name="done" iconWidth={20} iconHeight={20} />
                </View>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    checkbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: "#e1e1e1",
        borderRadius: 3
    },
    icon: {
    }
});

export default Checkbox;