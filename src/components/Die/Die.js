import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
    constructor(props) {
        super(props);
        this.lockTheDie = this.lockTheDie.bind(this);
    }
    lockTheDie() {
        this.props.lock(this.props.idx);
    }
    render() {
        const cls = "Die" + (this.props.isLocked ? " Die-locked" : "");
        return(
            <div className={cls} onClick={this.lockTheDie}>
                <i className={`fas fa-dice-${this.props.value}`}></i>
            </div>
        )
    }
}

export default Die;