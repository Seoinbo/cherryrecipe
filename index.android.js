import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Nav} from './components/nav/nav';

class Cherryrecipe extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Nav style={styles.nav}>Navigator</Nav>
                <Text style={styles.nav}>aaa</Text>
            </View>
        );
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
    }
});

AppRegistry.registerComponent('Cherryrecipe', () => Cherryrecipe);
