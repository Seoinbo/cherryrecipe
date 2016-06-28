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
        this.navigator;

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
         if (this.navigator.getCurrentRoutes().length === 1  ) {
            return false;
        } else {
            this.navigator.pop();
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
                renderScene={(route, navigator) => {
                    return this._renderScene(route, navigator);
                }}
            />
        )
    }

    _renderScene(route, navigator) {
        this.navigator = navigator;

        if (route.name == 'detail') {
            return <Detail navigator={navigator} {...this.props} />
        } else { // 'main'
            return <Main navigator={navigator} {...this.props} />
        }
    }

    _configureScene(route, routeStack) {
        console.log(Navigator.SceneConfigs.FloatFromBottom);
        return Navigator.SceneConfigs.FloatFromBottom;
    }


}

export default Router;