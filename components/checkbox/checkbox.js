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

        let defaultScale = 0.001;
        let defaultOpacity = 0; 

        this.checked = false;
        if (this.props.checked) {
            this.checked = true;
            defaultScale = 1;
            defaultOpacity = 1;
        }

        this.state = Object.assign({}, this.state, {
            animateIconScale: new Animated.Value(defaultScale),
            animateIconOpacity: new Animated.Value(defaultOpacity)
        });

        this._responder = {
            onStartShouldSetResponder: (e) => true,
            onResponderGrant: () => {this._highlight()},
            onResponderRelease: () => {this._handleResponderEnd()}
        };
    }

    render() {
        let {
            checked,
            disabled,
            value
        } = this.props;

        return (
            <View style={[this.props.style, styles.checkbox]} {...this._responder}>
                <View style={styles.box}>
                    <Animated.View style={{
                        transform: [
                            {scale: this.state.animateIconScale}
                        ],
                        opacity: this.state.animateIconOpacity
                    }}>
                        <Icon style={[styles.icon]} name="done" iconWidth={20} iconHeight={20} />
                    </Animated.View>
                </View>
            </View>
        )
    }

    toggle() {
        let scaleRatio;

        if (this.checked) {
            this.checked = false;
            scaleRatio = 0;
            opacityRatio = .1;
        } else {
            this.checked = true;
            scaleRatio = 1;
            opacityRatio = 1;
        }

        Animated.timing(
            this.state.animateIconScale, {
                toValue: scaleRatio,
                duration: 150
            }
        ).start();
        Animated.timing(
            this.state.animateIconOpacity, {
                toValue: opacityRatio,
                duration: 100
            }
        ).start();
    }

    _highlight() {
        this.toggle();
    }
 
    _handleResponderEnd() {
        let { checked, disabled } = this.props;
 
        if (!disabled) {
            this.props.onCheck && this.props.onCheck(!checked, this.props.value);
        }
    }
}

export const styles = StyleSheet.create({
    checkbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
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