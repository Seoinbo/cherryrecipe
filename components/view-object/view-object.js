import React, {Component} from 'react';
import {EventEmitter} from '../../services/event-emitter';

export class ViewObject extends Component {
    constructor() {
        super();
        this.state = {
            activation: false,
            visibility: false,
            rendering: true,
            editing: false
        };
        this.eventEmitter = new EventEmitter();
    }
    
    setViewState(nextState, complete) {
        this.setState(nextState, function (e) {
            if (complete) {
                complete.apply(null, [e]);
            }
            this.eventEmitter.fireEvent('stateSet', nextState, null);
        });
    }
    
    active() {
        if (!this.state.visibility) {
            this.show();
        }
        this.setViewState({activation: true});
    }

    inactive() {
        this.setViewState({activation: false});
    }
    
    

    toggleActivation() {
        if (this.state.activation) {
            this.inactive();
        } else {
            this.active();
        }
    }
    
    show() {
        this.setViewState({visibility: true});
    }

    hide() {
        this.setViewState({visibility: false});
    }
    
    enterEditMode() {
        this.setViewState({editing: true});
    }

    exitEditMode() {
        this.setViewState({editing: false});
    }
    
    toggleEditMode() {
        if (this.editing) {
            this.exitEditMode();
        } else {
            this.enterEditMode();
        }
    }
}