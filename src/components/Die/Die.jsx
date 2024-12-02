import React from "react";
import "./Die.css";

const Die = ({ idx, isLocked, isRolling, value, lock }) => {
    const lockTheDie = () => {
        lock(idx);
    };

    return (
        <div
            className={
                "Die" +
                (isLocked ? " Die-locked" : "") +
                (isRolling && !isLocked ? " Die-rolling" : "")
            }
            onClick={lockTheDie}
        >
            <i className={`fas fa-dice-${value}`}></i>
        </div>
    );
};

export default Die;
