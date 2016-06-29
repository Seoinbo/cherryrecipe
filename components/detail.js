// Exteranl modules
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import Realm from 'realm';

// Components
import Nav from './nav/nav';
import Toolbar from './toolbar/toolbar';
import Button from './button/button';
import Icon from './icon/icon';
import KeyboardSpacer from './keyboard-spacer/keyboard-spacer';

// Storages
import UserStorage from '../storages/user-storage';
import RecipeStorage from '../storages/recipe-storage';

class Detail extends Component {
    constructor(props, context) {
        super(props, context);
        
        // Set userid.
        this.userStorage = new UserStorage();

        // LocalStorage via recipes.
        this.recipeStorage = new RecipeStorage();
    }

    componentDidMount() {
    }

    render() {
        let {
            recipeID
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.content}>
                        <Nav style={styles.nav} childType="object">
                            <TouchableHighlight underlayColor="transparent">
                                <View style={styles.innerNav}>
                                    <Text style={styles.recipeName}>{recipeID}</Text>
                                </View>
                            </TouchableHighlight>
                        </Nav>
                    </View>             
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    wrapper: {
        flex: 1
    },
    content: {
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
        borderColor: '#e1e1e1',
        borderBottomWidth: 1
    },
    innerNav: {
        alignItems: 'center'
    },
    recipeName: {
        fontSize: 18
    },
});

export default Detail;