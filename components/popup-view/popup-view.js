import React, {Component} from 'react';
import {
    StyleSheet,
    DeviceEventEmitter,
    Animated,
    Easing,
    Text,
    View,
    Dimensions
} from 'react-native';
import {ViewObject} from '../view-object/view-object';
import {Button} from '../button/button';
import {Overlay} from '../overlay/overlay';
import {Layout} from '../../services/layout';

export class PopupView extends ViewObject {
    constructor() {
        super();
        this.state = Object.assign(this.state, {
            animate: {
                tooltipText: {
                    opacity: new Animated.Value(0),
                    xy: new Animated.ValueXY({x: 0, y: 15})
                },
                bg: {
                    opacity: new Animated.Value(0)
                },
                box: {
                    xy: new Animated.ValueXY({x: 0, y: 300})
                }
            },
            layout: {
                windowWidth: 0,
                windowHeight: 0,
                keyboardHeight: 0,
                tooltip: Layout.DefaultValue(),
                box: Layout.DefaultValue()
            }
        });
    }
    
    componentDidMount() {
        // Update state of window dimensions.
        this._updateWindowDims(); 
        
        setInterval( () => {
            console.log('interval: ', this.state.keyboardHeight);
        }, 3000)
        
        // Not supported 'keyboardWillShow' for Android.
        this.keyboardWillShowEvent = DeviceEventEmitter.addListener('keyboardDidShow', (frames) => {
            this._updateKeyboardHeight(frames);
        });
        
        this.keyboardWillHideEvent = DeviceEventEmitter.addListener('keyboardDidHide', () => {
            this._resetKeyboardHeight();
        });
    }
    
    _updateWindowDims() {
        let dims = Dimensions.get('window');
        this.setState({
            layout: Object.assign(this.state.layout, {
                windowWidth: dims.width,
                windowHeight: dims.height
            })
        });
    }
    
    _updateKeyboardHeight(frames) {
        this.setState({
            layout: Object.assign(this.state.layout, {
                keyboardHeight: frames.endCoordinates.height
            })
        });
        console.log('key: ', this.state.layout.keyboardHeight);
    }
    
    _resetKeyboardHeight() {
        this.setState({
            layout: Object.assign(this.state.layout, {
                keyboardHeight: 0
            })
        });
    }
    
    open() {
        this.active();
        
        Animated.parallel([
            Animated.timing(
                this.state.animate.tooltipText.opacity, {
                    delay: 230,
                    duration: 250,
                    toValue: 1
                }
            ),
            Animated.timing(
                this.state.animate.tooltipText.xy, {
                    delay: 230,
                    duration: 250,
                    easing: Easing.out(Easing.quad),
                    toValue: {x: 0, y: 0}
                }
            ),
            Animated.timing(
                this.state.animate.bg.opacity, {
                    duration: 250,
                    toValue: 1
                }
            ),
            Animated.timing(
                this.state.animate.box.xy, {
                    duration: 250,
                    toValue: {x: 0, y: 0}
                }
            )
        ]).start();
    }
    
    close() {
        Animated.parallel([
            Animated.timing(
                this.state.animate.tooltipText.opacity, {
                    duration: 250,
                    toValue: 0
                }
            ),
            Animated.timing(
                this.state.animate.tooltipText.xy, {
                    duration: 250,
                    toValue: {x: 0, y: 15}
                }
            ),
            Animated.timing(
                this.state.animate.bg.opacity, {
                    duration: 250,
                    toValue: 0
                }
            ),
            Animated.timing(
                this.state.animate.box.xy, {
                    duration: 250,
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
            <Overlay isVisible={this.state.activation} style={[styles.overlay, this.props.style, {height: this.state.layout.keyboardHeight}]}>
                <Animated.View style={[styles.bg, {opacity: this.state.animate.bg.opacity}]}></Animated.View>
                <View style={styles.content}>
                    <View ref='tooltip' style={styles.tooltip} onLayout={(event) => {this._onLayoutTooltip(event)}}>
                        <Animated.Text style={[styles.tooltipText, {opacity: this.state.animate.tooltipText.opacity, transform: this.state.animate.tooltipText.xy.getTranslateTransform()}]}>{this.props.tooltip}</Animated.Text>
                    </View>
                    <Animated.View style={[styles.box, {transform: this.state.animate.box.xy.getTranslateTransform()}]} onLayout={(event) => {this._onLayoutBox(event)}}>
                        <View style={styles.header}>
                            <Text style={styles.subject}>{this.props.title}</Text>
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
    
    _onLayoutTooltip(event) {
        let dimensions = event.nativeEvent.layout;
        this.setState({
            layout: {
                tooltip: {
                    width: dimensions.width,
                    height: dimensions.height,
                    x: dimensions.x,
                    y: dimensions.y
                }
            }
        });
    }
    
    _onLayoutBox(event) {
        let dimensions = event.nativeEvent.layout;
        this.setState({
            layout: {
                box: {
                    width: dimensions.width,
                    height: dimensions.height,
                    x: dimensions.x,
                    y: dimensions.y
                }
            }
        });
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