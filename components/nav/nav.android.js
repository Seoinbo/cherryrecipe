import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight
} from 'react-native';
import {Icon} from '../icon/icon';


export class Nav extends Component {

    render() {
        return (
            <View style={[styles.nav, this.props.style]}>
                <Icon/>
                <Text>{this.props.children}</Text>
            </View>
        )
    }
    
    _onPressButton() {
        alert(1);
    }
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6CC6B8'
  },
  subject: {
      fontSize: 15
  }
});

AppRegistry.registerComponent('Nav', () => Nav);
