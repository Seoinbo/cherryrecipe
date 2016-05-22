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
import {PopupViewLabel} from './components/popup-view-label/popup-view-label';


const actives = {
    labelExpend: false
};

var act = false;
var test = "navi";

class Cherryrecipe extends Component {
    constructor() {
        super();
        this.state = {
            currentLabelName: "All labels"
        };
    }
   
    render() {
        let expendIconName = actives.labelExpend ? 'expand_less' : 'expand_more';
        return (
            <View id="aaa" style={styles.container}>
                <View>
                    <Nav style={styles.nav} childType="object">
                        <TouchableHighlight underlayColor="paleturquoise" onPress={() => {this._labelListOpen()}}>
                            <View style={styles.innerNav}>
                                <Text ref="labelName" style={styles.labelName}>{this.state.currentLabelName}</Text>
                                <Icon style={styles.exandIcon} name={expendIconName} iconWidth="20" iconHeight="20"/>
                            </View>
                        </TouchableHighlight>
                    </Nav>
                </View>
                <PopupViewLabel ref="popupViewLabel" isVisible={false}></PopupViewLabel>
            </View>
        );
    }
    
    _labelListOpen() {
        this.refs.popupViewLabel.toggle();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e5e5e5',
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
    },
    layer: {
        position: 'absolute',
        top: 50,
        bottom: 0,
        left: 0,
        right: 0
        
    }
});

AppRegistry.registerComponent('Cherryrecipe', () => Cherryrecipe);