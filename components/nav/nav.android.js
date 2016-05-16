import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight
} from 'react-native';
import {Button} from '../button/button';

export class Nav extends Component {

    render() {
        return (
            <View style={[styles.nav, this.props.style]}>
                <Button icon="setting"/>
                <Text style={styles.subject}>{this.props.children}</Text>
                <Button icon="autorenew"/>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6CC6B8'
  },
  subject: {
      fontSize: 18
  }
});

AppRegistry.registerComponent('Nav', () => Nav);
