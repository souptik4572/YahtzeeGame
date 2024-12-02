import React from "react";
import "./Dice.css";

import Die from "../Die/Die.jsx";
import { numberToWords } from "../../helpers/generalHelper";

const Dice = ({ lock, isRolling, diceValues }) => {
    const allDie = diceValues.map((eachValue) => {
        const dieValue = numberToWords(eachValue.value);
        return (
            <Die
                key={eachValue.id}
                idx={eachValue.id}
                isLocked={eachValue.isLocked}
                isRolling={isRolling}
                value={dieValue}
                lock={lock}
            />
        );
    });
    return <div className="Dice">{allDie}</div>;
};

export default Dice;
