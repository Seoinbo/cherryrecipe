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
import Nav, {
    NavLeft,
    NavCenter,
    NavRight
} from './nav/nav';
import Toolbar from './toolbar/toolbar';
import Button from './button/button';
import Icon from './icon/icon';
import KeyboardSpacer from './keyboard-spacer/keyboard-spacer';
import ModalLayer from './modal-layer/modal-layer';

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

        // bind this.
        this._openMoreList = this._openMoreList.bind(this);
    }

    componentDidMount() {
    }

    render() {
        let {rnavigator, recipeID} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.content}>
                        <Nav style={styles.nav}>
                            <NavLeft rnavigator={rnavigator}/>
                            <NavCenter align="left">
                                {recipeID}
                            </NavCenter>
                            <NavRight>
                                <Button icon="visibility_off"/>
                                <Button icon="more_vert" onPress={this._openMoreList}/>
                            </NavRight>
                        </Nav>
                    </View>
                    <ModalLayer
                        ref="modalLayer"
                        renderComponent={(route, ref) => {
                            return this._renderComponent(route, ref);
                        }}
                    />
                </View>
            </View>
        );
    }
    
    _renderComponent(route, ref) {
    }

    _openMoreList() {
        this.refs.modalLayer.open();
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