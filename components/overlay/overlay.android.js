import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    BackAndroid
} from 'react-native';

import {Util} from '../../services/util';

export class Overlay extends Component {
    constructor(props, context) {
        super(props, context);
        this.props = props;
        this.state = {
            aboveStatusBar: false,
            isVisible: false
        };

        // bind this
        this._onBackAndroid = this._onBackAndroid.bind(this);
    }

     componentDidMount() {
        // 뒤로가기 시스템 버튼 눌렀을 때 창 닫기
        BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid);
     }

    _onBackAndroid() {
        if (this.props.isVisible) { 
            Util.apply(this.props.onBackAndroid, [], this);
            return true;
        } else {
            return false;
        }
    }
    
    render() {
       if (this.props.isVisible) {
            return (
                <View style={[this.props.style, styles.container]}>
                    {this.props.children}
                </View>
            );
        } else {
            return <View />;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderWidth: 0,
        backgroundColor: 'transparent'
    }
})