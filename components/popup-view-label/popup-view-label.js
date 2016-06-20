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
import {Util} from '../../services/util';
import ViewObject from '../view-object/view-object';
import {Button} from '../button/button';
import {PopupView} from '../popup-view/popup-view';
import {LabelItem} from './label-item.js';
import {KeyboardAwareListView} from 'react-native-keyboard-aware-scroll-view';
import {UserStorage} from '../../storages/user-storage';
import {LabelStorage} from '../../storages/label-storage';

export default class PopupViewLabel extends ViewObject {
    constructor(props, context) {
        super(props, context);
        // LocalStorage via users.
        this.userStorage = new UserStorage();
        
        // LocalStorage via labels.
        this.labelStorage = new LabelStorage();

        // Load label data.        
        var labelSource = new ListView.DataSource({rowHasChanged: this._labelDataChange}); 
        this.state = Object.assign({}, this.state, {
            arrLabelData: labelSource.cloneWithRows(this._getLabelData())
        });
    }

    componentDidMount() {
        // labelStorage의 데이터가 변경되면 화면도 갱신.
        this.labelStorage.realm.addListener('change', () => {
            this._updateRow();
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
        let {dispatch, selectMode} = this.props;
        return (
            <LabelItem 
                source={data}
                onRemove={()=>{this._removeLabel(data.id)}}
                onUpdate={(newText) => {this._onUpdateText(data, newText)}}
                {...{dispatch, selectMode}}
            />
        )
    }

    _onUpdateText(data, text) {
        // 라벨 네임 변경 시 local-storage에 저장.
        this.labelStorage.update(data.id, {name: text});
    }

    componentWillReceiveProps(next) {
    }
    
    _updateRow() {
        this.setState({arrLabelData: this.state.arrLabelData.cloneWithRows(this._getLabelData())});
    }
    
    render() {
        let {dispatch, keyboardState} = this.props;
        return (
            <PopupView 
                ref="popupView" 
                style={[styles.popupView, this.props.style]}
                headerButtons={{icon: 'add', callback: ()=>{this._addLabel()}}}
                boxHeight={350}
                title="Labels"
                tooltip={"라벨을 선택해주세요"}
                {...{dispatch, keyboardState}}>
                <ListView
                    keyboardShouldPersistTaps={true}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
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
    }
    
    _removeLabel(labelID) {
        this.labelStorage.delete(labelID);
    }
}

const styles = StyleSheet.create({
    popupView: {
    },
});