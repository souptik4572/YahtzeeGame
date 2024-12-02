import React from "react";
import "./Dice.css";

import Die from "../Die/Die";
import { numberToWords } from "../../helpers/generalHelper";
import { DieType } from "../../types/gameTypes";

interface DiceProps {
    lock: (uniqueId: string) => void;
    isRolling: boolean;
    diceValues: DieType[];
}

const Dice: React.FC<DiceProps> = ({ lock, isRolling, diceValues }) => {
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
