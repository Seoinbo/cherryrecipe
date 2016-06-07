import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableHighlight,
    DeviceEventEmitter,
    LayoutAnimation,
    Alert,
    Dimensions
} from 'react-native';
import Realm from 'realm';
import {Nav} from './components/nav/nav';
import {Icon} from './components/icon/icon';
import {PopupViewLabel} from './components/popup-view-label/popup-view-label';
import {UserStorage} from './storage/user-storage';

const { width, height } = Dimensions.get('window')

class Cherryrecipe extends Component {
    constructor() {
        super();
        this.state = {
            visibleHeight: height
        };
        DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
        DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
    }

    omponentWillMount () {
        
    }

    componentWillUnmount () {
        DeviceEventEmitter.removeAllListeners('keyboardDidShow')
        DeviceEventEmitter.removeAllListeners('keyboardDidHide')
    }

    keyboardDidShow (e) {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        let newSize = height - e.endCoordinates.height
        this.setState({
            visibleHeight: newSize
        })
        console.log("show", newSize);
    }

    keyboardDidHide (e) {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.setState({
            visibleHeight: height
        })
        console.log("hide", height);

    }
   
    render() {
        return (
            <View style={[styles.container, {height: this.state.visibleHeight}]}>
                <View style={styles.box}>
                    <TextInput
                    ref='username'
                    style={styles.input}
                    value="12345"
                    keyboardType='default'
                    returnKeyType='search'
                    underlineColorAndroid='transparent'/>
                      <TextInput
                    ref='username2'
                    autoCapitalize="none"
                    style={styles.input}
                    value="12345"
                    keyboardType='default'
                    returnKeyType='search'
                    underlineColorAndroid='transparent'/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sty: {
    },
    container: {
        justifyContent: 'center',
        backgroundColor: "#000000"
    },
    box: {
        height: 200,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        marginTop: 370,
        backgroundColor: "#5f9ea0"
        
    }
});

AppRegistry.registerComponent('Cherryrecipe', () => Cherryrecipe);