import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    If
} from 'react-native';
import {Button} from '../button/button';

export class Nav extends Component {

    render() {
        let subjectBox;
        if (this.props.childType == 'object') {
            subjectBox = <Text style={styles.subject}>{this.props.children}</Text>;
        } else {
            subjectBox = <View style={styles.subjectbox}>{this.props.children}</View>;
        }
        
        return (
            <View style={[styles.nav, this.props.style]}>
                <Button icon="setting"/>
                {subjectBox}
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
  },
  subjectbox: {
      
  }
});

AppRegistry.registerComponent('Nav', () => Nav);
