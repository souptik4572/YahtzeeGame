import { v4 as uuidv4 } from "uuid";
import { DieType, ScoreType } from "../types/gameTypes";

export const pickRandomValue = (): number => {
    return Math.floor(Math.random() * 6) + 1;
};

const numberWords: string[] = ["one", "two", "three", "four", "five", "six"];

export const numberToWords = (number: number): string => {
    return numberWords[number - 1];
};

export const generateDiceState = (numberOfDie: number): DieType[] =>
    Array.from({ length: numberOfDie }).map(() => {
        return {
            id: uuidv4(),
            isLocked: false,
            value: pickRandomValue(),
        };
    });

export const generateUpperScores = (num: number): ScoreType[] =>
    Array.from({ length: num }).map(() => undefined);
