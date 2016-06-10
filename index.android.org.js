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
import {UserStorage} from './storages/user-storage';

const { width, height } = Dimensions.get('window')

class Cherryrecipe extends Component {
    constructor() {
        super();
        this.state = {
            visibleHeight: height
        };
        // DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
        DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
    }

    omponentWillMount () {
        
    }

    componentWillUnmount () {
        // DeviceEventEmitter.removeAllListeners('keyboardDidShow')
        DeviceEventEmitter.removeAllListeners('keyboardDidHide')
    }

    keyboardDidShow (e) {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        
    
        this.refs.myview1.measure((fx, fy, width, height, px, py) => {
            console.log('Y offset to page: ' + py)

            let newSize = height - e.endCoordinates.height;
            this.setState({
                visibleHeight: 350
            })

            console.log("show", newSize);
        })

        
    }

    keyboardDidHide (e) {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.setState({
            visibleHeight: height
        })

        this.refs.myview1.measure((fx, fy, width, height, px, py) => {
            console.log('----> Y offset to page: ' + py)
        })
        console.log("hide", height);

        

    }

    _focus() {
        this.setState({
            visibleHeight: 260
        })
        console.log("focus");
    }
   
    render() {
        return (
            <View ref="myview" style={[styles.container, {height: this.state.visibleHeight}]}>
                <View ref="myview1" style={styles.box}>
                    <TextInput
                    ref="myview2"
                    style={styles.input}
                    value="12345"
                    keyboardType='default'
                    returnKeyType='search'
                    onFocus={() => {this._focus()}}
                    underlineColorAndroid='transparent'/>
                      <TextInput
                    ref='username3'
                    autoCapitalize="none"
                    style={styles.input}
                    value="2222"
                    onFocus={() => {this._focus()}}
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
        marginTop: 200,
        backgroundColor: "#5f9ea0"
        
    }
});

AppRegistry.registerComponent('Cherryrecipe', () => Cherryrecipe);