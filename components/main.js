// Exteranl modules
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableHighlight,
    Platform
} from 'react-native';
import Realm from 'realm';

// Components
import {Nav} from './nav/nav';
import {Icon} from './icon/icon';
import PopupViewLabel from './popup-view-label/popup-view-label';
import KeyboardSpacer from './keyboard-spacer/keyboard-spacer';

// Storages
import {UserStorage} from '../storages/user-storage';

import {keyboardWillShow} from '../actions/device';

const actives = {
    labelExpend: false
};

export default class Main extends Component {
    constructor() {
        super();
        
        // Set userid.
        this.user = new UserStorage();
        this.user.realm.write(() => {
            this.user.realm.create('User', {
                id: 'g1625346125341653'
            }, true);
        });

        console.log("a", this.props);

        this.state = Object.assign({}, this.state, {
            currentLabelName: "All labels"
        });
    }

    componentWillReceiveProps(props) {
        console.log("a: ", props);
        console.log("b: ", this.props);
    }

   
    render() {
        let {dispatch, keyboardState} = this.props;
        let expendIconName = actives.labelExpend ? 'expand_less' : 'expand_more';

        let keyboardSpacer;
        if (Platform.OS != 'android') {
            keyboardSpacer = <keyboardSpacer/>
        }
        
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
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
                    <PopupViewLabel
                        ref="popupViewLabel"
                        isVisible={false}
                        {...{dispatch, keyboardState}}>
                    </PopupViewLabel>
                </View>
                {keyboardSpacer}
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
    wrapper: {
        flex: 1
    },
    keyboardSpace: {
        height: 200,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000'
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