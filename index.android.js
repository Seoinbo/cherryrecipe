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
import {PopupView} from './components/popup-view/popup-view';


const actives = {
    labelExpend: false
};

var act = false;
var test = "navi";

class Cherryrecipe extends Component {
    constructor() {
        super();
    }   
    
    getInitialState() {
        return {message: 'fewfewf'};
    }
    
    handleChange(val) {
        this.setState({message: val});
    }
    
    render() {
        // this.setState({message: 'cccccccc'});
        console.log(this.state);
        
        
        let expendIconName = actives.labelExpend ? 'expand_less' : 'expand_more';
        let aaa = <PopupView style={styles.layer}></PopupView>;
        return (
            <View id="aaa" style={styles.container}>
                <View>
                    <Nav style={styles.nav} childType="object">
                        <TouchableHighlight underlayColor="paleturquoise" onPress={() => {this._onPressButton()}}>
                            <View style={styles.innerNav}>
                                <Text ref="labelName" style={styles.labelName}>{this.state.message}</Text>
                                <Icon style={styles.exandIcon} name={expendIconName} iconWidth="20" iconHeight="20"/>
                            </View>
                        </TouchableHighlight>
                    </Nav>
                </View>
                {act ? aaa : null}
            </View>
        );
    }
    
    _onPressButton() {
        if (act) {
            act = false;
            test = "aaaaa";
        } else {
            act = true;
            test = "bbbbbb";
        }
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
    },
    layer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
        
    }
});

AppRegistry.registerComponent('Cherryrecipe', () => Cherryrecipe);