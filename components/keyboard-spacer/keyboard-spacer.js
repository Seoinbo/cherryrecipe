import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    LayoutAnimation,
    View,
    Platform
} from 'react-native';

class KeyboardSpacer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            keyboardSpace: 0,
            isKeyboardOpened: false
        };

        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
    }

    componentWillUpdate(props, state) {
        if (state.isKeyboardOpened !== this.state.isKeyboardOpened) {
            LayoutAnimation.configureNext({
                duration: 500,
                create: {
                    duration: 300,
                    type: LayoutAnimation.Types.easeInEaseOut,
                    property: LayoutAnimation.Properties.opacity
                },
                update: {
                    type: LayoutAnimation.Types.spring,
                    springDamping: 200
                }
            });
        }
    }

    updateKeyboardSpace(frames) {
        let keyboardSpace = frames.endCoordinates.height;
        this.setState({
            keyboardSpace: keyboardSpace,
            isKeyboardOpened: true
        }, () => ('onToggle' in this.props ? this.props.onToggle(true, keyboardSpace) : null));
    }

    resetKeyboardSpace() {
        this.setState({
            keyboardSpace: 0,
            isKeyboardOpened: false
        }, () => ('onToggle' in this.props ? this.props.onToggle(false, 0) : null));
    }

    componentDidMount() {
        if (Platform.OS == "android") {
            this._listeners = [
                DeviceEventEmitter.addListener('keyboardDidShow', this.updateKeyboardSpace),
                DeviceEventEmitter.addListener('keyboardDidHide', this.resetKeyboardSpace)
            ];
        } else {
            this._listeners = [
                DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace),
                DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace)
            ];
        }
    }

    componentWillUnmount() {
        this._listeners.forEach(function(listener) {
            listener.remove();
        });
    }

    render() {
        return (<View style={[{height: this.state.keyboardSpace, left: 0, right: 0, bottom: 0, backgroundColor: '#000000'}, this.props.style]}/>);
    }
}

export default KeyboardSpacer;