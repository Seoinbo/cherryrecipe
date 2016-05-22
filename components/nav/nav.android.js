import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight
} from 'react-native';
import {Button} from '../button/button';

export class Nav extends Component {

    render() {
        let subjectBox;
        if (this.props.childType == 'object') {
            subjectBox = <View style={styles.subjectbox}>{this.props.children}</View>;
        } else {
            subjectBox = <Text style={styles.subject}>{this.props.children}</Text>;
        }
        
        return (
            <View style={[styles.nav, this.props.style]}>
                <Button icon="settings"/>
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
    alignItems: 'center'
  },
  subject: {
      fontSize: 18
  },
  subjectbox: {
      
  }
});