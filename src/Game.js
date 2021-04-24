import React, { Component } from 'react';
import './Game.css';
import { v4 as uuidv4 } from 'uuid';

import Dice from './Dice';
import Score from './Score';
import { pickRandomValue, numberToWords } from './helper';
import { individualScore, checkThreeOfKind, checkFourOfKind, checkFullHouse, checkLargeStraight, checkYahtzee, sumAllValues } from './scoreHelper';

const Rolls_Left = 3;
const Total_Rounds = 12;

class Game extends Component {
	static defaultProps = {
		dice: 5
	};
	constructor(props) {
		super(props);
		this.state = {
			dice: Array.from({ length: this.props.dice }).map(() => {
				return {
					id: uuidv4(),
					isLocked: false,
					value: pickRandomValue()
				};
			}),
			rollsLeft: Rolls_Left,
            totalScore: 0,
            totalRounds: Total_Rounds,
            upperScore: Array.from({ length: 6 }).map(() => undefined),
            threeOfKind: undefined,
            fourOfKind: undefined,
            fullHouse: undefined,
            smallStraight: undefined,
            largeStraight: undefined,
            yahtzee: undefined,
            chance: undefined
		};
		this.handleRoll = this.handleRoll.bind(this);
        this.handleLock = this.handleLock.bind(this);
        this.assignUpperScore = this.assignUpperScore.bind(this);
        this.assignThreeOfKind = this.assignThreeOfKind.bind(this);
        this.assignFourOfKind = this.assignFourOfKind.bind(this);
        this.assignChance = this.assignChance.bind(this);
        this.assignFullHouse = this.assignFullHouse.bind(this);
        this.assignYahtzee = this.assignYahtzee.bind(this);
        this.assignLargeStraight = this.assignLargeStraight.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
	}
	handleRoll() {
		const newDiceValues = this.state.dice.map((die) => {
			if (!die.isLocked) return { ...die, value: pickRandomValue() };
			return die;
		});
		this.setState({ dice: newDiceValues, rollsLeft: this.state.rollsLeft - 1 });
	}
	handleLock(uniqueId) {
		const newDiceLocks = this.state.dice.map((die) => {
			if (uniqueId === die.id) {
				return { ...die, isLocked: !die.isLocked };
			}
			return die;
		});
		this.setState({ dice: newDiceLocks });
    }
    increaseScore_decreaseRound(newScore) {
        this.setState({ totalScore: this.state.totalScore + newScore, totalRounds: this.state.totalRounds - 1 });
        this.handleRoll();
        this.setState({ rollsLeft: Rolls_Left });
    }
    assignUpperScore(id) {
        if(this.state.upperScore[id] === undefined){
            const newUpperScore = this.state.upperScore;
            newUpperScore[id] = individualScore(id+1, this.state.dice);
            this.setState({ upperScore: newUpperScore });
            this.increaseScore_decreaseRound(newUpperScore[id]);
        }
    }
    assignThreeOfKind(id) {
        if(this.state.threeOfKind === undefined){
            const threeScore = checkThreeOfKind(this.state.dice);
            this.setState({ threeOfKind: threeScore });
            this.increaseScore_decreaseRound(threeScore);
        }
    }
    assignFourOfKind(id) {
        if(this.state.fourOfKind === undefined){
            const fourScore = checkFourOfKind(this.state.dice);
            this.setState({ fourOfKind: fourScore });
            this.increaseScore_decreaseRound(fourScore);
        }
    }
    assignFullHouse(id) {
        if(this.state.fullHouse === undefined){
            const fullHouseScore = checkFullHouse(this.state.dice);
            this.setState({ fullHouse: fullHouseScore });
            this.increaseScore_decreaseRound(fullHouseScore);
        }
    }
    assignLargeStraight(id) {
        if(this.state.largeStraight === undefined) {
            const largeStraightScore = checkLargeStraight(this.state.dice);
            this.setState({ largeStraight: largeStraightScore });
            this.increaseScore_decreaseRound(largeStraightScore);
        }
    }
    assignYahtzee(id) {
        if(this.state.yahtzee === undefined){
            const yahtzeeScore = checkYahtzee(this.state.dice);
            this.setState({ yahtzee: yahtzeeScore });
            this.increaseScore_decreaseRound(yahtzeeScore);  
        }
    }
    assignChance(id) {
        const chanceScore = sumAllValues(this.state.dice);
        if(this.state.chance === undefined){
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
					value: pickRandomValue()
				};
			}),
			rollsLeft: Rolls_Left,
            totalScore: 0,
            totalRounds: Total_Rounds,
            upperScore: Array.from({ length: 6 }).map(() => undefined),
            threeOfKind: undefined,
            fourOfKind: undefined,
            fullHouse: undefined,
            smallStraight: undefined,
            largeStraight: undefined,
            yahtzee: undefined,
            chance: undefined
        })
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
			<div className="Game">
				<div className="Game-dice">
					<p>Yahtzee!</p>
					<Dice nDie={this.props.dice} diceValues={this.state.dice} lock={this.handleLock} />
					<button
						className={!!!this.state.rollsLeft ? 'Game-lockedButton' : ''}
						onClick={this.handleRoll}
						disabled={!!!this.state.rollsLeft}
					>
						{' '}
						{this.state.rollsLeft} Rolls Left{' '}
					</button>
				</div>
				<div className="Game-score">
                    <div className="Game-score-parts">
                        <h1>Upper</h1>
                        {scoreUpperPart}
                        <h1>Lower</h1>
                        <Score id={1} scoreName="three of kind" scoreValue={this.state.threeOfKind === undefined ? "Sum all dice if 3 are the same" : this.state.threeOfKind} assignScore={this.assignThreeOfKind} />
                        <Score id={1} scoreName="four of kind" scoreValue={this.state.fourOfKind === undefined ? "Sum all dice if 4 are the same" : this.state.fourOfKind} assignScore={this.assignFourOfKind} />
                        <Score id={1} scoreName="full house" scoreValue={this.state.fullHouse === undefined ? "25 points for a full house" : this.state.fullHouse} assignScore={this.assignFullHouse} />
                        <Score id={1} scoreName="small straight" scoreValue={this.state.smallStraight === undefined ? "30 points for a small straight" : this.state.smallStraight} />
                        <Score id={1} scoreName="large straight" scoreValue={this.state.largeStraight === undefined ? "40 points for a large straight" : this.state.largeStraight} assignScore={this.assignLargeStraight} />
                        <Score id={1} scoreName="yahtzee" scoreValue={this.state.yahtzee === undefined ? "50 points for yahtzee" : this.state.yahtzee} assignScore={this.assignYahtzee} />
                        <Score id={1} scoreName="chance" scoreValue={this.state.chance === undefined ? "Sum of all dice" : this.state.chance}  assignScore={this.assignChance} />
                    </div>
                    <div className="Game-total-score">
                        <h1>total score: {this.state.totalScore} </h1>
                    </div>
                    <button className="Game-restart" onClick={this.handleRestart}>play again</button>
                </div>
			</div>
		);
	}
}

export default Game;
