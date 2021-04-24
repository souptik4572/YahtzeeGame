import React, { Component } from 'react';
import './Dice.css';

import Die from '../Die/Die';
import { numberToWords } from '../../helpers/generalHelper';

class Dice extends Component {
	render() {
		const { isRolling } = this.props;
		const allDie = this.props.diceValues.map((eachValue) => {
			const dieValue = numberToWords(eachValue.value);
			return (
				<Die
					key={eachValue.id}
					idx={eachValue.id}
					isLocked={eachValue.isLocked}
                    isRolling={isRolling}
					value={dieValue}
					lock={this.props.lock}
				/>
			);
		});
		return <div className='Dice'>{allDie}</div>;
	}
}

export default Dice;
