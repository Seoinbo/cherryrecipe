import React, {Component} from 'react';
import {
    StyleSheet,
    Animated,
    Easing,
    Text,
    View
} from 'react-native';
import {ViewObject} from '../view-object/view-object';
import {Button} from '../button/button';
import {Overlay} from '../overlay/overlay';

export class PopupView extends ViewObject {
    constructor() {
        super();
        this.state = Object.assign(this.state, {
            aniBgOpacity: new Animated.Value(0), // init opacity 0
            aniBoxPos: new Animated.ValueXY({x: 0, y: 300})
        });
        

    }
    
    componentDidMount() {
        
    }
    
    open() {
        this.active();
        Animated.parallel([
            Animated.timing(
                this.state.aniBgOpacity, {
                    duration: 250,
                    toValue: 1
                }
            ),
            Animated.timing(
                this.state.aniBoxPos, {
                    duration: 250,
                    toValue: {x: 0, y: 0}
                }
            )
        ]).start();
    }
    
    close() {
        Animated.parallel([
            Animated.timing(
                this.state.aniBgOpacity, {
                    duration: 250,
                    toValue: 0
                }
            ),
            Animated.timing(
                this.state.aniBoxPos, {
                    duration: 250,
                    // easing: Easing.inOut(Easing.ease),
                    toValue: {x: 0, y: 300}
                }
            )
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
    
    render() {
        return (
            <Overlay isVisible={this.state.activation} style={[styles.overlay, this.props.style]}>
                <Animated.View style={[styles.bg, {opacity: this.state.aniBgOpacity}]}></Animated.View>
                <View style={styles.content}>
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltipText}>It's tooltip!</Text>
                    </View>
                    <Animated.View style={[styles.box, {transform: this.state.aniBoxPos.getTranslateTransform()}]}>
                        <View style={styles.header}>
                            <Text style={styles.subject}>Subject</Text>
                            <Button style={styles.closeButton} icon="expand_more" onPress={() => {this.close()}} />
                        </View>
                        <View style={styles.body}>
                            {React.Children.map(this.props.children, React.cloneElement)}
                        </View>
                    </Animated.View>
                </View>
            </Overlay>
        )        
    }
}

const styles = StyleSheet.create({
    overlay: {
    },
    bg: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    tooltip: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tooltipText: {
        margin: 25,
        fontSize: 24,
        color: '#666666'
    },
    box: {
        height: 300,
        backgroundColor: '#ffffff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60
    },
    subject: {
        marginLeft: 25,
        fontSize: 18,
        color: '#000000'
    },
    closeButton: {
        marginRight: 10
    },
    body: {
        flex: 1
    }
});