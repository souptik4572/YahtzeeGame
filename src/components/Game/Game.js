import React, { Component } from 'react';
import './Game.css';
import { v4 as uuidv4 } from 'uuid';

import Dice from '../Dice/Dice';
import Score from '../Score/Score';
import { pickRandomValue, numberToWords } from '../../helpers/generalHelper';
import {
	individualScore,
	checkThreeOfKind,
	checkFourOfKind,
	checkFullHouse,
	checkSmallStraight,
	checkLargeStraight,
	checkYahtzee,
	sumAllValues,
} from '../../helpers/scoreHelper';

const ROLLS_LEFT = 3;
const TOTAL_ROUNDS = 13;

class Game extends Component {
	static defaultProps = {
		dice: 5,
	};
	constructor(props) {
		super(props);
		this.state = {
			dice: Array.from({ length: this.props.dice }).map(() => {
				return {
					id: uuidv4(),
					isLocked: false,
					value: pickRandomValue(),
				};
			}),
			isRolling: false,
			rollsLeft: ROLLS_LEFT,
			totalScore: 0,
			totalRounds: TOTAL_ROUNDS,
			upperScore: Array.from({ length: 6 }).map(() => undefined),
			threeOfKind: undefined,
			fourOfKind: undefined,
			fullHouse: undefined,
			smallStraight: undefined,
			largeStraight: undefined,
			yahtzee: undefined,
			chance: undefined,
		};
		this.handleRoll = this.handleRoll.bind(this);
		this.handleLock = this.handleLock.bind(this);
		this.unlockAllDie = this.unlockAllDie.bind(this);
		this.assignUpperScore = this.assignUpperScore.bind(this);
		this.assignThreeOfKind = this.assignThreeOfKind.bind(this);
		this.assignFourOfKind = this.assignFourOfKind.bind(this);
		this.assignChance = this.assignChance.bind(this);
		this.assignFullHouse = this.assignFullHouse.bind(this);
		this.assignYahtzee = this.assignYahtzee.bind(this);
		this.assignSmallStraight = this.assignSmallStraight.bind(this);
		this.assignLargeStraight = this.assignLargeStraight.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
	}
	async handleRoll() {
		const newDiceValues = this.state.dice.map((die) => {
			if (!die.isLocked) return { ...die, value: pickRandomValue() };
			return die;
		});
		this.setState({ isRolling: true }, () => {
			setTimeout(() => {
				this.setState({ isRolling: false });
			}, 1000);
			this.setState({ dice: newDiceValues, rollsLeft: this.state.rollsLeft - 1 });
		});
	}
	handleLock(uniqueId) {
		const newDiceLocks = this.state.dice.map((die) => {
			if (uniqueId === die.id && !this.state.isRolling) {
				return { ...die, isLocked: !die.isLocked };
			}
			return die;
		});
		this.setState({ dice: newDiceLocks });
	}
	async unlockAllDie() {
		console.log('Unlocking all die');
		const newDiceLocks = this.state.dice.map((die) => {
			return { ...die, isLocked: false };
		});
		this.setState({ dice: newDiceLocks });
	}
	async increaseScore_decreaseRound(newScore) {
		this.setState({
			totalScore: this.state.totalScore + newScore,
			totalRounds: this.state.totalRounds - 1,
		});
		await this.unlockAllDie(this.handleRoll);
		await this.handleRoll();
		this.setState({ rollsLeft: ROLLS_LEFT });
	}
	assignUpperScore(id) {
		if (this.state.upperScore[id] === undefined) {
			const newUpperScore = this.state.upperScore;
			newUpperScore[id] = individualScore(id + 1, this.state.dice);
			this.setState({ upperScore: newUpperScore });
			this.increaseScore_decreaseRound(newUpperScore[id]);
		}
	}
	assignThreeOfKind() {
		if (this.state.threeOfKind === undefined) {
			const threeScore = checkThreeOfKind(this.state.dice);
			this.setState({ threeOfKind: threeScore });
			this.increaseScore_decreaseRound(threeScore);
		}
	}
	assignFourOfKind() {
		if (this.state.fourOfKind === undefined) {
			const fourScore = checkFourOfKind(this.state.dice);
			this.setState({ fourOfKind: fourScore });
			this.increaseScore_decreaseRound(fourScore);
		}
	}
	assignFullHouse() {
		if (this.state.fullHouse === undefined) {
			const fullHouseScore = checkFullHouse(this.state.dice);
			this.setState({ fullHouse: fullHouseScore });
			this.increaseScore_decreaseRound(fullHouseScore);
		}
	}
	assignSmallStraight() {
		if (this.state.smallStraight === undefined) {
			const smallStraightScore = checkSmallStraight(this.state.dice);
			this.setState({ smallStraight: smallStraightScore });
			this.increaseScore_decreaseRound(smallStraightScore);
		}
	}
	assignLargeStraight() {
		if (this.state.largeStraight === undefined) {
			const largeStraightScore = checkLargeStraight(this.state.dice);
			this.setState({ largeStraight: largeStraightScore });
			this.increaseScore_decreaseRound(largeStraightScore);
		}
	}
	assignYahtzee() {
		if (this.state.yahtzee === undefined) {
			const yahtzeeScore = checkYahtzee(this.state.dice);
			this.setState({ yahtzee: yahtzeeScore });
			this.increaseScore_decreaseRound(yahtzeeScore);
		}
	}
	assignChance() {
		const chanceScore = sumAllValues(this.state.dice);
		if (this.state.chance === undefined) {
			this.setState({ chance: chanceScore });
			this.increaseScore_decreaseRound(chanceScore);
		}
	}
	handleRestart() {
		this.setState({
			dice: Array.from({ length: this.props.dice }).map(() => {
				return {
					id: uuidv4(),
					isLocked: false,
					value: pickRandomValue(),
				};
			}),
			rollsLeft: ROLLS_LEFT,
			totalScore: 0,
			totalRounds: TOTAL_ROUNDS,
			upperScore: Array.from({ length: 6 }).map(() => undefined),
			threeOfKind: undefined,
			fourOfKind: undefined,
			fullHouse: undefined,
			smallStraight: undefined,
			largeStraight: undefined,
			yahtzee: undefined,
			chance: undefined,
		});
	}
	render() {
		const scoreUpperPart = this.state.upperScore.map((element, idx) => {
			return (
				<Score
					key={idx}
					id={idx}
					scoreName={numberToWords(idx + 1)}
					scoreValue={element === undefined ? `${idx + 1} point per ${idx + 1}` : element}
					assignScore={this.assignUpperScore}
				/>
			);
		});
		return (
			<div className='Game'>
				<div className='Game-dice'>
					<p>Yahtzee!</p>
					<Dice
						nDie={this.props.dice}
						diceValues={this.state.dice}
						lock={this.handleLock}
						isRolling={this.state.isRolling}
					/>
					<button
						className={
							!!!this.state.rollsLeft || this.state.isRolling
								? 'Game-lockedButton'
								: ''
						}
						onClick={this.handleRoll}
						disabled={!!!this.state.rollsLeft || this.state.isRolling}
					>
						{' '}
						{this.state.rollsLeft} Rolls Left{' '}
					</button>
				</div>
				<div className='Game-score'>
					<div className='Game-score-parts'>
						<h1>Upper</h1>
						{scoreUpperPart}
						<h1>Lower</h1>
						<Score
							id={1}
							scoreName='three of kind'
							scoreValue={
								this.state.threeOfKind === undefined
									? 'Sum all dice if 3 are the same'
									: this.state.threeOfKind
							}
							assignScore={this.assignThreeOfKind}
						/>
						<Score
							id={1}
							scoreName='four of kind'
							scoreValue={
								this.state.fourOfKind === undefined
									? 'Sum all dice if 4 are the same'
									: this.state.fourOfKind
							}
							assignScore={this.assignFourOfKind}
						/>
						<Score
							id={1}
							scoreName='full house'
							scoreValue={
								this.state.fullHouse === undefined
									? '25 points for a full house'
									: this.state.fullHouse
							}
							assignScore={this.assignFullHouse}
						/>
						<Score
							id={1}
							scoreName='small straight'
							scoreValue={
								this.state.smallStraight === undefined
									? '30 points for a small straight'
									: this.state.smallStraight
							}
							assignScore={this.assignSmallStraight}
						/>
						<Score
							id={1}
							scoreName='large straight'
							scoreValue={
								this.state.largeStraight === undefined
									? '40 points for a large straight'
									: this.state.largeStraight
							}
							assignScore={this.assignLargeStraight}
						/>
						<Score
							id={1}
							scoreName='yahtzee'
							scoreValue={
								this.state.yahtzee === undefined
									? '50 points for yahtzee'
									: this.state.yahtzee
							}
							assignScore={this.assignYahtzee}
						/>
						<Score
							id={1}
							scoreName='chance'
							scoreValue={
								this.state.chance === undefined
									? 'Sum of all dice'
									: this.state.chance
							}
							assignScore={this.assignChance}
						/>
					</div>
					<div className='Game-total-score'>
						<h1>total score: {this.state.totalScore} </h1>
					</div>
					<button className='Game-restart' onClick={this.handleRestart}>
						{this.state.totalRounds === 0 ? 'play again' : 'restart game'}
					</button>
				</div>
			</div>
		);
	}
}

export default Game;
