import React, { useState } from "react";
import "./Game.css";

import Dice from "../Dice/Dice.jsx";
import Score from "../Score/Score.jsx";
import { pickRandomValue, numberToWords, generateDiceState, generateUpperScores } from "../../helpers/generalHelper";
import {
    individualScore,
    checkThreeOfKind,
    checkFourOfKind,
    checkFullHouse,
    checkSmallStraight,
    checkLargeStraight,
    checkYahtzee,
    sumAllValues,
} from "../../helpers/scoreHelper";
import { ROLLS_LEFT, TOTAL_ROUNDS } from "../../helpers/constants.js"

const Game = ({ numberOfDie = 5 }) => {
    const [dice, setDice] = useState(generateDiceState(numberOfDie));
    const [isRolling, setIsRolling] = useState(false);
    const [rollsLeft, setRollsLeft] = useState(ROLLS_LEFT);
    const [totalScore, setTotalScore] = useState(0);
    const [totalRounds, setTotalRounds] = useState(TOTAL_ROUNDS);
    const [upperScore, setUpperScore] = useState(generateUpperScores(6));
    const [threeOfKind, setThreeOfKind] = useState(undefined);
    const [fourOfKind, setFourOfKind] = useState(undefined);
    const [fullHouse, setFullHouse] = useState(undefined);
    const [smallStraight, setSmallStraight] = useState(undefined);
    const [largeStraight, setLargeStraight] = useState(undefined);
    const [yahtzee, setYahtzee] = useState(undefined);
    const [chance, setChance] = useState(undefined);

    const handleRoll = async () => {
        const newDiceValues = dice.map((die) => {
            if (!die.isLocked) return { ...die, value: pickRandomValue() };
            return die;
        });
        setIsRolling(true);
        setTimeout(() => {
            setIsRolling(false);
        }, 1000);
        setDice(newDiceValues);
        setRollsLeft(rollsLeft - 1);
    };

    const handleLock = (uniqueId) => {
        const newDiceLocks = dice.map((die) => {
            if (uniqueId === die.id && !isRolling) {
                return { ...die, isLocked: !die.isLocked };
            }
            return die;
        });
        setDice(newDiceLocks);
    };

    const unlockAllDie = async () => {
        console.log("Unlocking all die");
        const newDiceLocks = dice.map((die) => {
            return { ...die, isLocked: false };
        });
        setDice(newDiceLocks);
    };

    const increaseScore_decreaseRound = async (newScore) => {
        setTotalScore(totalScore + newScore);
        setTotalRounds(totalRounds - 1);
        await unlockAllDie(handleRoll);
        await handleRoll();
        setRollsLeft(ROLLS_LEFT);
    };

    const assignUpperScore = (id) => {
        if (upperScore[id] === undefined) {
            const newUpperScore = upperScore;
            newUpperScore[id] = individualScore(id + 1, dice);
            setUpperScore(newUpperScore);
            increaseScore_decreaseRound(newUpperScore[id]);
        }
    };

    const assignThreeOfKind = () => {
        if (threeOfKind === undefined) {
            const threeScore = checkThreeOfKind(dice);
            setThreeOfKind(threeScore);
            increaseScore_decreaseRound(threeScore);
        }
    };

    const assignFourOfKind = () => {
        if (fourOfKind === undefined) {
            const fourScore = checkFourOfKind(dice);
            setFourOfKind(fourScore);
            increaseScore_decreaseRound(fourScore);
        }
    };

    const assignFullHouse = () => {
        if (fullHouse === undefined) {
            const fullHouseScore = checkFullHouse(dice);
            setFullHouse(fullHouseScore);
            increaseScore_decreaseRound(fullHouseScore);
        }
    };

    const assignSmallStraight = () => {
        if (smallStraight === undefined) {
            const smallStraightScore = checkSmallStraight(dice);
            setSmallStraight(smallStraightScore);
            increaseScore_decreaseRound(smallStraightScore);
        }
    };

    const assignLargeStraight = () => {
        if (largeStraight === undefined) {
            const largeStraightScore = checkLargeStraight(dice);
            setLargeStraight(largeStraightScore);
            increaseScore_decreaseRound(largeStraightScore);
        }
    };

    const assignYahtzee = () => {
        if (yahtzee === undefined) {
            const yahtzeeScore = checkYahtzee(dice);
            setYahtzee(yahtzeeScore);
            increaseScore_decreaseRound(yahtzeeScore);
        }
    };

    const assignChance = () => {
        const chanceScore = sumAllValues(dice);
        if (chance === undefined) {
            setChance(chanceScore);
            increaseScore_decreaseRound(chanceScore);
        }
    };

    const handleRestart = () => {
        setDice(generateDiceState(numberOfDie));
        setRollsLeft(ROLLS_LEFT);
        setTotalScore(0);
        setTotalRounds(TOTAL_ROUNDS);
        setUpperScore(generateUpperScores(6));
        setThreeOfKind(undefined);
        setFourOfKind(undefined);
        setFullHouse(undefined);
        setSmallStraight(undefined);
        setLargeStraight(undefined);
        setYahtzee(undefined);
        setChance(undefined);
    };

    return (
        <div className="Game">
            <div className="Game-dice">
                <p>Yahtzee!</p>
                <Dice
                    nDie={numberOfDie}
                    diceValues={dice}
                    lock={handleLock}
                    isRolling={isRolling}
                />
                <button
                    className={
                        !!!rollsLeft || isRolling ? "Game-lockedButton" : ""
                    }
                    onClick={handleRoll}
                    disabled={!!!rollsLeft || isRolling}
                >
                    {" "}
                    {rollsLeft} Rolls Left{" "}
                </button>
            </div>
            <div className="Game-score">
                <div className="Game-score-parts">
                    <h1>Upper</h1>
                    {upperScore.map((element, idx) => (
                        <Score
                            key={idx}
                            id={idx}
                            scoreName={numberToWords(idx + 1)}
                            scoreValue={
                                element === undefined
                                    ? `${idx + 1} point per ${idx + 1}`
                                    : element
                            }
                            assignScore={assignUpperScore}
                        />
                    ))}
                    <h1>Lower</h1>
                    <Score
                        id={1}
                        scoreName="three of kind"
                        scoreValue={
                            threeOfKind === undefined
                                ? "Sum all dice if 3 are the same"
                                : threeOfKind
                        }
                        assignScore={assignThreeOfKind}
                    />
                    <Score
                        id={1}
                        scoreName="four of kind"
                        scoreValue={
                            fourOfKind === undefined
                                ? "Sum all dice if 4 are the same"
                                : fourOfKind
                        }
                        assignScore={assignFourOfKind}
                    />
                    <Score
                        id={1}
                        scoreName="full house"
                        scoreValue={
                            fullHouse === undefined
                                ? "25 points for a full house"
                                : fullHouse
                        }
                        assignScore={assignFullHouse}
                    />
                    <Score
                        id={1}
                        scoreName="small straight"
                        scoreValue={
                            smallStraight === undefined
                                ? "30 points for a small straight"
                                : smallStraight
                        }
                        assignScore={assignSmallStraight}
                    />
                    <Score
                        id={1}
                        scoreName="large straight"
                        scoreValue={
                            largeStraight === undefined
                                ? "40 points for a large straight"
                                : largeStraight
                        }
                        assignScore={assignLargeStraight}
                    />
                    <Score
                        id={1}
                        scoreName="yahtzee"
                        scoreValue={
                            yahtzee === undefined
                                ? "50 points for yahtzee"
                                : yahtzee
                        }
                        assignScore={assignYahtzee}
                    />
                    <Score
                        id={1}
                        scoreName="chance"
                        scoreValue={
                            chance === undefined ? "Sum of all dice" : chance
                        }
                        assignScore={assignChance}
                    />
                </div>
                <div className="Game-total-score">
                    <h1>total score: {totalScore} </h1>
                </div>
                <button className="Game-restart" onClick={handleRestart}>
                    {totalRounds === 0 ? "play again" : "restart game"}
                </button>
            </div>
        </div>
    );
};

export default Game;
