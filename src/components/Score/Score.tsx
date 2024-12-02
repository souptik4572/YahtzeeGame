import React from "react";
import "./Score.css";
import { ScoreValueType } from "../../types/gameTypes";

interface ScoreProps {
	id: number,
	scoreName: string,
	scoreValue: ScoreValueType,
	assignScore: (id: number) => void
}

const Score: React.FC<ScoreProps>= ({ id, scoreName, scoreValue, assignScore }) => {
    const handleScore = () => {
        assignScore(id);
    };
    return (
        <div
            className={
                "Score" +
                (typeof scoreValue === "number" ? " Score-assigned" : "")
            }
            onClick={handleScore}
        >
            <span className="Score-name"> {scoreName} </span>
            <span> {scoreValue} </span>
        </div>
    );
};

export default Score;
