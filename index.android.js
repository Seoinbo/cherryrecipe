import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import {Nav} from './components/nav/nav';
import {Icon} from './components/icon/icon';

const actives = {
    labelExpend: false
};

class Cherryrecipe extends Component {
   
    render() {
        let expendIconName = actives.labelExpend ? 'expand_less' : 'expand_more';
        
        return (
            <View style={styles.container}>
                <Nav style={styles.nav} childType="object">
                    <TouchableHighlight underlayColor="paleturquoise" onPress={this._onPressButton}>
                        <View style={styles.innerNav}>
                            <Text style={styles.labelName}>Labels</Text>
                            <Icon style={styles.exandIcon} name={expendIconName} iconWidth="20" iconHeight="20"/>
                        </View>
                    </TouchableHighlight>
                </Nav>
            </View>
        );
    }
    
    _onPressButton() {
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#888888',
    },
    nav: {
        height: 50,
    },
    innerNav: {
        alignItems: 'center'
    },
    labelName: {
        fontSize: 18
    },
    exandIcon: {
        marginTop: -5
    }
});

AppRegistry.registerComponent('Cherryrecipe', () => Cherryrecipe);