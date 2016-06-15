import React, {Component} from 'react';
import {
    StyleSheet,
    Animated,
    Easing,
    Text,
    View,
    DeviceEventEmitter,
    Dimensions,
    LayoutAnimation
} from 'react-native';
import ViewObject from '../view-object/view-object';
import {Button} from '../button/button';
import {Overlay} from '../overlay/overlay';
import {Layout} from '../../services/layout';
import {hideKeyboard} from '../../services/keyboard';

export class PopupView extends ViewObject {
    constructor(props, context) {
        super(props, context);
        this.state = Object.assign({}, this.state, {
            closeButtonMode: 'hide', // 'hide'|'ok',
            boxHeight: props.boxHeight,
            animateTooltipTextOpacity: new Animated.Value(0),
            animateTooltipTextXy: new Animated.ValueXY({x: 0, y: 15}),
            animateBgOpacity: new Animated.Value(0), 
            animateBoxXy: new Animated.ValueXY({x: 0, y: 300})
        });
    }
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     return (
    //         nextProps.todo !== this.props.todo ||
    //         nextState.label !== this.state.label
    //     );
    // } 

    componentWillUpdate() {
    }

    
    componentDidMount() {
        // 키보드의 상태에 따라 닫기 버튼 모드를 변경.
        this.keyboardDidShowListener = DeviceEventEmitter.addListener('keyboardDidShow', (event) => {
             this._changeCloseButtonMode('ok');
             this._updateBoxHeight(event); 
        });
        this.keyboardDidHideListener = DeviceEventEmitter.addListener('keyboardDidHide', (event) => {
            this._changeCloseButtonMode('close');
            this._updateBoxHeight(); 
        });
    }
    
    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    _changeCloseButtonMode(mode = 'close') {
        this.setState({
            closeButtonMode: mode
        });
    }

    _updateBoxHeight(e) {
        let {width, height} = Dimensions.get('window');
        let keyboardSpace = 0;
        if (e && e !== null) {
            keyboardSpace = e.endCoordinates.height;
        }
        let screenHeight = height - keyboardSpace;
        let boxHeight = this.props.boxHeight; 
        if (boxHeight > screenHeight) {
            boxHeight = screenHeight;
        } 
        this.setState({boxHeight: boxHeight});
    }
   
    open() {
        this.active();
        
        Animated.parallel([
            Animated.timing(
                this.state.animateTooltipTextOpacity, {
                    delay: 230,
                    duration: 250,
                    toValue: 1
                }
            ),
            Animated.timing(
                this.state.animateTooltipTextXy, {
                    delay: 230,
                    duration: 250,
                    easing: Easing.out(Easing.quad),
                    toValue: {x: 0, y: 0}
                }
            ),
            Animated.timing(
                this.state.animateBgOpacity, {
                    duration: 250,
                    toValue: 1
                }
            ),
            Animated.timing(
                this.state.animateBoxXy, {
                    duration: 250,
                    
                    toValue: {x: 0, y: 0}
                }
            )
        ]).start();
    }
    
    close() {
        Animated.parallel([
            Animated.timing(
                this.state.animateTooltipTextOpacity, {
                    duration: 250,
                    toValue: 0
                }
            ),
            Animated.timing(
                this.state.animateTooltipTextXy, {
                    duration: 250,
                    toValue: {x: 0, y: 15}
                }
            ),
            Animated.timing(
                this.state.animateBgOpacity, {
                    duration: 250,
                    toValue: 0
                }
            ),
            Animated.timing(
                this.state.animateBoxXy, {
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
        // 닫기 버튼
        let closeButtonComponent;
        if (this.state.closeButtonMode == 'ok') {
            closeButtonComponent = <Button style={styles.closeButton} icon="done" onPress={hideKeyboard} />;
        } else { // 'hide'
            closeButtonComponent = <Button style={styles.closeButton} icon="expand_more" onPress={() => {this.close()}} />;
        }
        
        // 헤더 버튼 추가
        let headerButtons = [];
        if (this.props.headerButtons instanceof Object) {
            headerButtons.push(this.props.headerButtons);
        } else if (this.props.headerButtons instanceof Array) {
            for (var key in this.props.headerButtons) {
                if (object.hasOwnProperty(key)) {
                    headerButtons.push(object[key]);
                }
            }
        }
        
        return (
            <Overlay isVisible={this.state.activation} style={[styles.overlay, this.props.style]}>
                <Animated.View style={[styles.bg, {opacity: this.state.animateBgOpacity}]}></Animated.View>
                <View style={[styles.content]} removeClippedSubviews={true}>
                    <View ref='tooltip' style={styles.tooltip}>
                        <Animated.Text style={[styles.tooltipText, {opacity: this.state.animateTooltipTextOpacity, transform: this.state.animateTooltipTextXy.getTranslateTransform()}]}>{this.props.tooltip}</Animated.Text>
                    </View>
                    <Animated.View style={[styles.box, {height: this.state.boxHeight}, {transform: this.state.animateBoxXy.getTranslateTransform()}]}>
                        <View style={styles.header}>
                            <Text style={styles.subject}>{this.props.title}</Text>
                            <View style={styles.buttons}>
                                {
                                    headerButtons.reverse().map( function(button, i) {
                                        return <Button key={i} icon={button.icon} onPress={button.callback} />; 
                                    })
                                }
                                {closeButtonComponent}
                            </View>
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
        right: 0,
        overflow: 'hidden'
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
    buttons: {
        flexDirection: 'row',
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