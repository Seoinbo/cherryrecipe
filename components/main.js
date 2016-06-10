// Exteranl modules
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import Realm from 'realm';

// Components
import {Nav} from './nav/nav';
import {Icon} from './icon/icon';
import {PopupViewLabel} from './popup-view-label/popup-view-label';

// Storages
import {UserStorage} from '../storage/user-storage';

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
        let {dispatch} = this.props;

        let expendIconName = actives.labelExpend ? 'expand_less' : 'expand_more';

        // this.props.dispatch(keyboardWillShow([1]));

        console.log("props: ", this.props);
        console.log("store1: ", this.state);
        


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
    sty: {
    },
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