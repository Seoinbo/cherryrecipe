import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight 
} from 'react-native';
import {commStyles} from '../styles';
import ViewObject from '../view-object/view-object';
import Icon from '../icon/icon';
import {ToggleView} from '../toggle-view/toggle-view';

class Button extends ViewObject {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        var touchableProps = {};
        if (!this.props.disabled) {
            touchableProps.onPress = this.props.onPress;
            touchableProps.onPressIn = this.props.onPressIn;
            touchableProps.onPressOut = this.props.onPressOut;
            touchableProps.onLongPress = this.props.onLongPress;
        }

        let textLabel;
        if (typeof this.props.children == 'string') {
            textLabel = <Text style={styles.text}>{this.props.children}</Text>;
        }

        return (
            <ToggleView style={[styles.button, this.props.style]} rendering={this.props.rendering} visible={this.props.visible}>
                <TouchableHighlight {...touchableProps} underlayColor="transparent">
                    <View style={styles.box}>
                        <Icon name={this.props.icon}/>
                        {textLabel}
                    </View>
                </TouchableHighlight>
            </ToggleView>
        )
    }
}

export const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45
    },
    box: {
        flexWrap: 'nowrap',
        flexDirection: 'row'
    },
    text: {
        marginLeft: 3,
        paddingRight: 5
    }
});

export default Button;