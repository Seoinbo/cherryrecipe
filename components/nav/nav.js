import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight
} from 'react-native';
import Button from '../button/button';
import ViewObject from '../view-object/view-object';

class Nav extends ViewObject {
    
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={[styles.nav, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

class NavLeft extends ViewObject {
    
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let backButton = <View/>;
        if (this.props.displayBackButton) {
            backButton = <Button icon="add"/>;
        }

        return (
            <View style={[styles.navLeft, this.props.style]}>
                {backButton}
                {this.props.children}
            </View>
        )
    }
}

class NavCenter extends ViewObject {
    
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let optionalStyles = {
            alignItems: 'center'
        };
        if (this.props.align == 'left') {
            optionalStyles.alignItems = 'flex-start';
        }

        return (
            <View style={[styles.navCenter, this.props.style, optionalStyles]}>
                {this.props.children}
            </View>
        )
    }
}

class NavRight extends ViewObject {
    
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={[styles.navRight, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subject: {
        fontSize: 18
    },
    subjectbox: {

    },
    navLeft: {
        flexDirection: 'row',
        backgroundColor: '#334455'
    },
    navCenter: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#112233'
    },
    navRight: {
        flexDirection: 'row',
        backgroundColor: '#556677'
    }
});

export default Nav;
export {
    NavLeft,
    NavCenter,
    NavRight
};