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
        this.props = props;

        // bind this.
        this._backScene = this._backScene.bind(this);
    }

    render() {
        // back-button, default value is true.
        let backButton = <Button icon="arrow_back" onPress={this._backScene}/>;
        if (this.props.displayBackButton === false) {
            backButton = <View/>;
        }

        return (
            <View style={[styles.navLeft, this.props.style]}>
                {backButton}
                {this.props.children}
            </View>
        )
    }

    _backScene() {
        if (!this.props.rnavigator) {
            return;
        }
        this.props.rnavigator.pop();
    }
}

class NavCenter extends ViewObject {
    
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {children} = this.props;

        let optionalStyles = {
            justifyContent: 'center'
        };
        if (this.props.align == 'left') {
            optionalStyles.justifyContent = 'flex-start';
        } else if (this.props.align == 'right') {
            optionalStyles.justifyContent = 'flex-end';
        }

        // subject
        let innerContent;
        if (typeof children == 'string') {
            innerContent = <Text numberOfLines={1} style={styles.subject}>{children}</Text>
        } else {
            innerContent = children;
        }

        return (
            <View style={[styles.navCenter, this.props.style, optionalStyles]}>
                {innerContent}
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
        fontSize: 18,
        color: '#000000'
    },
    navLeft: {
        flexDirection: 'row'
    },
    navCenter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navRight: {
        flexDirection: 'row'
    }
});

export default Nav;
export {
    NavLeft,
    NavCenter,
    NavRight
};