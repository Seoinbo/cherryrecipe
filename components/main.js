// Exteranl modules
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    ListView
} from 'react-native';
import Realm from 'realm';

// Components
import Nav from './nav/nav';
import Toolbar from './toolbar/toolbar';
import PreviewCard from './preview-card/preview-card';
import Button from './button/button';
import Icon from './icon/icon';
import PopupViewLabel from './popup-view-label/popup-view-label';
import KeyboardSpacer from './keyboard-spacer/keyboard-spacer';

// Storages
import UserStorage from '../storages/user-storage';
import RecipeStorage from '../storages/recipe-storage';

import {keyboardWillShow} from '../actions/device';

const actives = {
    labelExpend: false
};

export default class Main extends Component {
    constructor() {
        super();
        
        // Set userid.
        this.userStorage = new UserStorage();
        this.userStorage.realm.write(() => {
            this.userStorage.realm.create('User', {
                id: 'g1625346125341653'
            }, true);
        });

        // LocalStorage via recipes.
        this.recipeStorage = new RecipeStorage();

        // Load recipe data.        
        var recipeSource = new ListView.DataSource({rowHasChanged: this._recipeDataChange});
        this.state = Object.assign({}, this.state, {
            currentLabelName: "All labels",
            arrRecipeData: recipeSource.cloneWithRows(this._getRecipeData())
        });
    }

    componentDidMount() {
        // recipeStorage의 데이터가 변경되면 화면도 갱신.
        this.recipeStorage.realm.addListener('change', () => {
            this._updateRow();
        });
    }

    _updateRow() {
        this.setState({arrRecipeData: this.state.arrRecipeData.cloneWithRows(this._getRecipeData())});
    }

    _getRecipeData() {
        let data;
        try {
            data = this.recipeStorage.realm.objects('Recipe');
        } catch (e) {
            data = [];
        }
        return data;
    }

    _recipeDataChange(r1, r2) {
        return r1 !== r2;
    }

    _renderRow(data) {
        return (
            <PreviewCard
                key={data.id} 
                source={data}
            />
        )
    }
   
    render() {
        let {dispatch, keyboardState} = this.props;
        let expendIconName = actives.labelExpend ? 'expand_less' : 'expand_more';

        let keyboardSpacer;
        if (Platform.OS != 'android') { 
            keyboardSpacer = <KeyboardSpacer/>
        }

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.content}>
                        <Nav style={styles.nav} childType="object">
                            <TouchableHighlight underlayColor="transparent" onPress={() => {this._labelListOpen()}}>
                                <View style={styles.innerNav}>
                                    <Text ref="labelName" style={styles.labelName}>{this.state.currentLabelName}</Text>
                                    <Icon style={styles.exandIcon} name={expendIconName} iconWidth="20" iconHeight="20"/>
                                </View>
                            </TouchableHighlight>
                        </Nav>
                        <ListView 
                            style={styles.list}
                            enableEmptySections={true}
                            dataSource={this.state.arrRecipeData}
                            renderRow={(rowData, sectionID, rowID, highlightRow) => {
                                return this._renderRow(rowData)}
                            }>
                        </ListView>
                        <Toolbar style={styles.toolbar}>
                            <Button style={styles.addRecipeButton} icon="add" onPress={()=>this._addRecipe()}>새 레시피</Button>
                            <View style={styles.toolbarButtonGroup}>
                                <Button icon="public"/>
                                <Button icon="shopping_cart"/>
                                <Button icon="search"/>
                            </View>
                        </Toolbar>
                    </View>
                    <PopupViewLabel
                        ref="popupViewLabel"
                        isVisible={false}
                        onSelect={(source) => this._onSelectLabel(source)}
                        {...{dispatch, keyboardState}}>
                    </PopupViewLabel>
                </View>
                {keyboardSpacer}
            </View>
        );
    }

    _addRecipe() {

        this.props.navigator.push({
            name: 'detail',
            index: 2
          });

        // this.recipeStorage.add({
        //     owner: this.userStorage.userid
        // });
    }

    _onSelectLabel(source) {
        alert("select label \"" + source.name + "\"");
    }
    
    _labelListOpen() {
        this.refs.popupViewLabel.toggle();
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
    },
    list: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    toolbar: {
        borderColor: '#e1e1e1',
        borderTopWidth: 1
    },
    addRecipeButton: {
        width: 130
    },
    toolbarButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});