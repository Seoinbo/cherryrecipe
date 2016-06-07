import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ListView,
    TouchableHighlight,
    RecyclerViewBackedScrollView
} from 'react-native';
import {commStyles} from '../styles';
import {ViewObject} from '../view-object/view-object';
import {Button} from '../button/button';
import {PopupView} from '../popup-view/popup-view';
import {LabelItem} from './label-item.js';
import {KeyboardAwareListView} from 'react-native-keyboard-aware-scroll-view';
import {UserStorage} from '../../storage/user-storage';
import {LabelStorage} from '../../storage/label-storage';

export class PopupViewLabel extends ViewObject {
    constructor() {
        super();
        // LocalStorage via users.
        this.userStorage = new UserStorage();
        
        // LocalStorage via labels.
        this.labelStorage = new LabelStorage();

        // Load label data.        
        var labelSource = new ListView.DataSource({rowHasChanged: this._labelDataChange}); 
        this.state = Object.assign(this.state, {
            arrLabelData: labelSource.cloneWithRows(this._getLabelData())
        });
    }
    
    _getLabelData() {
        let data;
        try {
            data = this.labelStorage.realm.objects('Label');
        } catch (e) {
            data = [];
        }
        return data;
    }
    
    _labelDataChange(r1, r2) {
        return r1 !== r2;
    }
    
    _renderRow(data) {
        return (
            <LabelItem source={data} onRemove={()=>{this._removeLabel(data.id)}}/>
        )
    }
    
    _updateRow() {
        this.setState({arrLabelData: this.state.arrLabelData.cloneWithRows(this._getLabelData())});
    }
    
    render() {
        return (
            <PopupView ref="popupView" 
                style={[styles.popupView, this.props.style]}
                headerButtons={{icon: 'add', callback: ()=>{this._addLabel()}}}
                boxHeight={290}
                title="Labels"
                tooltip="라벨을 선택해주세요">
                <ListView
                    keyboardShouldPersistTaps={true} 
                    enableEmptySections={true}
                    dataSource={this.state.arrLabelData}
                    renderRow={(rowData, sectionID, rowID, highlightRow) => {
                        return this._renderRow(rowData)}
                    }
                />
            </PopupView>
        )
    }
    
    open() {
        this.refs.popupView.open();
    }
    
    close() {
        this.refs.popupView.close();
    }
    
    toggle() {
        this.refs.popupView.toggle();
    }
    
    _addLabel() {
        this.labelStorage.add({
            owner: this.userStorage.userid
        });
        
        setTimeout( () => {
            this._updateRow();
        }, 100);
    }
    
    _removeLabel(labelID) {
        this.labelStorage.delete(labelID);
        setTimeout( () => {
            this._updateRow();
        }, 100);
    }
}

const styles = StyleSheet.create({
    popupView: {
    },
});