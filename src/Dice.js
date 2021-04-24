import React, { Component } from 'react';
import './Dice.css';

import Die from './Die';
import { numberToWords } from './helper';

class Dice extends Component {
    render() {
        const allDie = this.props.diceValues.map(eachValue => {
            const dieValue = numberToWords(eachValue.value);
            return <Die key={eachValue.id} idx={eachValue.id} isLocked={eachValue.isLocked} value={dieValue} lock={this.props.lock} />
        });
        return(
            <div className="Dice">
                {allDie}
            </div>
        )
    }
}

export default Dice;