export const individualScore = (id, diceValues) => {
    let count = 0;
    diceValues.forEach((element) => {
        if (element.value === id) count++;
    });
    return id * count;
};

const countFrequency = (diceValues) => {
    const dict = {};
    diceValues.forEach((element) => {
        if (dict[element.value] === undefined) {
            dict[element.value] = 1;
        } else {
            dict[element.value]++;
        }
    });
    return dict;
};

const getRawDiceValues = (diceValues) =>
    diceValues.map((aDiceValue) => {
        return aDiceValue.value;
    });

export const checkThreeOfKind = (diceValues) => {
    const dict = countFrequency(diceValues);
    for (let keys in dict) {
        if (dict[keys] === 3) {
            return sumAllValues(diceValues);
        }
    }
    return 0;
};

export const checkFourOfKind = (diceValues) => {
    const dict = countFrequency(diceValues);
    for (let keys in dict) {
        if (dict[keys] === 4) {
            return sumAllValues(diceValues);
        }
    }
    return 0;
};

export const checkFullHouse = (diceValues) => {
    const dict = countFrequency(diceValues);
    const dictKeys = Object.keys(dict);
    if (dictKeys.length !== 2) return 0;
    else if (
        (dict[dictKeys[0]] === 2 && dict[dictKeys[1]] === 3) ||
        (dict[dictKeys[0]] === 3 && dict[dictKeys[1]] === 2)
    )
        return 25;
    return 0;
};

export const checkSmallStraight = (diceValues) => {
    const diceSet = new Set(getRawDiceValues(diceValues));
    console.log(diceSet);
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

export const checkLargeStraight = (diceValues) => {
    const dict = countFrequency(diceValues);
    if (Object.keys(dict).length === 5) return 40;
    return 0;
};

export const checkYahtzee = (diceValues) => {
    let currentValue = diceValues[0].value;
    for (let i = 1; i < diceValues.length; i++) {
        if (currentValue !== diceValues[i].value) return 0;
        currentValue = diceValues[i].value;
    }
    return 50;
};

export const sumAllValues = (diceValues) =>
    diceValues.reduce((total, current) => total + current.value, 0);
