import { DictType, DieType } from "../types/gameTypes";

export const individualScore = (id: number, diceValues: DieType[]): number => {
    let count = 0;
    diceValues.forEach((element: DieType) => {
        if (element.value === id) count++;
    });
    return id * count;
};

const countFrequency = (diceValues: DieType[]): DictType => {
    const dict: DictType = {};
    diceValues.forEach((element: DieType) => {
        if (dict[element.value] === undefined) {
            dict[element.value] = 1;
        } else {
            dict[element.value]++;
        }
    });
    return dict;
};

const getRawDiceValues = (diceValues: DieType[]): number[] =>
    diceValues.map((aDiceValue: DieType) => {
        return aDiceValue.value;
    });

export const checkThreeOfKind = (diceValues: DieType[]): number => {
    const dict: DictType = countFrequency(diceValues);
    for (let keys in dict) {
        if (dict[keys] === 3) {
            return sumAllValues(diceValues);
        }
    }
    return 0;
};

export const checkFourOfKind = (diceValues: DieType[]): number => {
    const dict: DictType = countFrequency(diceValues);
    for (let keys in dict) {
        if (dict[keys] === 4) {
            return sumAllValues(diceValues);
        }
    }
    return 0;
};

export const checkFullHouse = (diceValues: DieType[]): number => {
    const dict: DictType = countFrequency(diceValues);
    const dictKeys: string[] = Object.keys(dict);
    if (dictKeys.length !== 2) return 0;
    else if (
        (dict[dictKeys[0]] === 2 && dict[dictKeys[1]] === 3) ||
        (dict[dictKeys[0]] === 3 && dict[dictKeys[1]] === 2)
    )
        return 25;
    return 0;
};

export const checkSmallStraight = (diceValues: DieType[]): number => {
    const diceSet: Set<number> = new Set(getRawDiceValues(diceValues));
    if (
        diceSet.has(2) &&
        diceSet.has(3) &&
        diceSet.has(4) &&
        (diceSet.has(5) || diceSet.has(1))
    )
        return 30;
    if (diceSet.has(3) && diceSet.has(4) && diceSet.has(5) && diceSet.has(6))
        return 30;
    return 0;
};

export const checkLargeStraight = (diceValues: DieType[]): number => {
    const dict: DictType = countFrequency(diceValues);
    if (Object.keys(dict).length === 5) return 40;
    return 0;
};

export const checkYahtzee = (diceValues: DieType[]): number => {
    let currentValue = diceValues[0].value;
    for (let i = 1; i < diceValues.length; i++) {
        if (currentValue !== diceValues[i].value) return 0;
        currentValue = diceValues[i].value;
    }
    return 50;
};

export const sumAllValues = (diceValues: DieType[]): number =>
    diceValues.reduce((total: number, current: DieType) => total + current.value, 0);
