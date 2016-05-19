import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight 
} from 'react-native';
import {Icon} from '../icon/icon';

export class Button extends Component {
    render() {
        var touchableProps = {};
        if (!this.props.disabled) {
            touchableProps.onPress = this.props.onPress;
            touchableProps.onPressIn = this.props.onPressIn;
            touchableProps.onPressOut = this.props.onPressOut;
            touchableProps.onLongPress = this.props.onLongPress;
        }
    
        return (
            <TouchableHighlight {...touchableProps} underlayColor="paleturquoise" style={[styles.button, this.props.style]}>
                <View style={styles.box}>
                    <Icon name={this.props.icon}/>
                    <Text>{this.props.children}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

export const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45,
        backgroundColor: '#3AE2CE'
    },
    box: {
        flexWrap: 'nowrap',
        flexDirection: 'row'
    }
});
