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
		const { isRolling, isLocked } = this.props;
		const cls = 'Die' + (isLocked ? ' Die-locked' : '') + (isRolling ? ' Die-rolling' : '');
		return (
			<div className={cls} onClick={this.lockTheDie}>
				<i className={`fas fa-dice-${this.props.value}`}></i>
			</div>
		);
	}
}

export default Die;
