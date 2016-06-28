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
        return (
            <View style={styles.container}>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#66cdaa'
    }
});

export default Detail;