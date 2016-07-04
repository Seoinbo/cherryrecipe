import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated
} from 'react-native';

import {Overlay} from '../overlay/overlay';
import ViewObject from '../view-object/view-object';
import Button from '../button/button';
import Menu from './menu/menu';

class ModalLayer extends ViewObject {
    constructor(props, context) {
        super(props, context);
        this.props = props;

        this.state = Object.assign({}, this.state, {
            animateBgOpacity: new Animated.Value(0),
            animateHeaderOpacity: new Animated.Value(0)
        });

        // bind this.
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.active();

        Animated.parallel([
            Animated.timing(this.state.animateBgOpacity, {
                duration: 150,
                toValue: 0.8
            }),
            Animated.timing(this.state.animateHeaderOpacity, {
                duration: 150,
                toValue: 0.8
            })
        ]).start();
    }
    
    close() {
        Animated.parallel([
            Animated.timing(this.state.animateBgOpacity, {
                duration: 150,
                toValue: 0
            }),
            Animated.timing(this.state.animateHeaderOpacity, {
                duration: 150,
                toValue: 0
            })
        ]).start( () => {
            this.inactive();
        });
    }
    
    toggle() {
        if (this.state.activation) {
            this.close();
        } else {
            this.open();
        }
    }

    _renderMenu() {
        return (
            <Menu />
        )
    }

    render() {
        return (
            <Overlay isVisible={this.state.activation} onBackAndroid={this.close}>
                <Animated.View style={[styles.bg, {opacity: this.state.animateBgOpacity}]}></Animated.View>
                <View style={[styles.content]}>
                    <Animated.View style={[styles.header, {opacity: this.state.animateHeaderOpacity}]}>
                        <Button icon="clear" onPress={this.close}/>
                    </Animated.View>
                    {this._renderMenu()}
                </View>
            </Overlay>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: '#ffffff'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden'
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default ModalLayer;