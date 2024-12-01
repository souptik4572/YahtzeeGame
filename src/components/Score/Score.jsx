import React from "react";
import "./Score.css";

const Score = ({ id, scoreName, scoreValue, assignScore }) => {
    const handleScore = () => {
        assignScore(id);
    };

    return (
        <div
            className={
                "Score" + typeof scoreValue === "number"
                    ? " Score-assigned"
                    : ""
            }
            onClick={handleScore}
        >
            <span className="Score-name"> {scoreName} </span>
            <span> {scoreValue} </span>
        </div>
    );
};

export default Score;
