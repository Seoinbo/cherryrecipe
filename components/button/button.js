import React, { Component } from 'react';
import {
    StyleSheet,
    Text as Title,
    View,
    TouchableHighlight
} from 'react-native';
import Svg, {
    Path
} from 'react-native-svg';

export class Button extends Component {
    render() {
        return (
            <View style={[styles.nav, this.props.style]}>
                <TouchableHighlight onPress={this._onPressButton}>
                    <Svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"/>
                        <Path d="M0 0h24v24H0z" fill="none"/>
                    </Svg>
                </TouchableHighlight>
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
