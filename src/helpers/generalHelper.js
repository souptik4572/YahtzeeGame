import { v4 as uuidv4 } from "uuid";

export const pickRandomValue = () => {
    return Math.floor(Math.random() * 6) + 1;
};

const numberWords = ["one", "two", "three", "four", "five", "six"];

export const numberToWords = (number) => {
    return numberWords[number - 1];
};

export const generateDiceState = (numberOfDie) =>
    Array.from({ length: numberOfDie }).map(() => {
        return {
            id: uuidv4(),
            isLocked: false,
            value: pickRandomValue(),
        };
    });

export const generateUpperScores = (num) =>
    Array.from({ length: num }).map(() => undefined);
