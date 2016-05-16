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
        return (
            <TouchableHighlight style={[styles.button, this.props.style]} onPress={this._onPressButton}>
                <View style={styles.box}>
                    <Icon name={this.props.icon}/>
                    <Text>{this.props.children}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    
    _onPressButton() {
        alert(1);
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
