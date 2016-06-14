import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {createStore} from 'redux';

// Redux
import {Provider} from 'react-redux';
import MainContainer from './containers/main-container';
import reducerPackage from './reducers';

// Constants of redux.
const store = createStore(reducerPackage);

store.subscribe( () => {
    console.log("store: ", store.getState());
})


class Cherryrecipe extends Component {
    render () {
        return (
            <Provider store={store}>
                <MainContainer />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('Cherryrecipe', () => Cherryrecipe);