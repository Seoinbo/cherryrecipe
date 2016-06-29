import React, {Component} from 'react';
import {
    StyleSheet,
    Navigator,
    BackAndroid,
    Alert
} from 'react-native';
import Main from '../components/main';
import Detail from '../components/detail';

class Router extends Component {
    constructor(props, context) {
        super(props, context);
        this.props = props;

        // we fill this up upon on first navigation.
        this.rnavigator;

        // bind this
        this._onBackAndroid = this._onBackAndroid.bind(this);
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    componentWillUnmount () {
        BackAndroid.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }

    _onBackAndroid() {
         if (this.rnavigator.getCurrentRoutes().length === 1) {
            return false;
        } else {
            this.rnavigator.pop();
            return true;
        }
    }

    render() {
        return (
            <Navigator 
                initialRoute={{name: 'main', index: 0}}
                configureScene={(route, routeStack) => {
                    return this._configureScene(route, routeStack);
                }}
                renderScene={(route, rnavigator) => {
                    return this._renderScene(route, rnavigator);
                }}
            />
        )
    }

    _renderScene(route, rnavigator) {
        this.rnavigator = rnavigator;

        if (route.name == 'detail') {
            return <Detail rnavigator={rnavigator} recipeID={route.recipeID} {...this.props} />
        } else { // 'main'
            return <Main rnavigator={rnavigator} {...this.props} />
        }
    }

    _configureScene(route, routeStack) {
        return Navigator.SceneConfigs.FloatFromRight;
    }


}

export default Router;