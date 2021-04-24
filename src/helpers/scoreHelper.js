function individualScore(id, diceValues) {
	let count = 0;
	diceValues.forEach((element) => {
		if (element.value === id) count++;
	});
	return id * count;
}

function countFrequency(diceValues) {
	const dict = {};
	diceValues.forEach((element) => {
		if (dict[element.value] === undefined) {
			dict[element.value] = 1;
		} else {
			dict[element.value]++;
		}
	});
	return dict;
}

function getRawDiceValues(diceValues) {
	const rawDiceValues = diceValues.map((aDiceValue) => {
		return aDiceValue.value;
	});
	return rawDiceValues;
}

function checkThreeOfKind(diceValues) {
	const dict = countFrequency(diceValues);
	for (let keys in dict) {
		if (dict[keys] === 3) {
			return sumAllValues(diceValues);
		}
	}
	return 0;
}

function checkFourOfKind(diceValues) {
	const dict = countFrequency(diceValues);
	for (let keys in dict) {
		if (dict[keys] === 4) {
			return sumAllValues(diceValues);
		}
	}
	return 0;
}

function checkFullHouse(diceValues) {
	const dict = countFrequency(diceValues);
	const dictKeys = Object.keys(dict);
	if (dictKeys.length !== 2) return 0;
	else if (
		(dict[dictKeys[0]] === 2 && dict[dictKeys[1]] === 3) ||
		(dict[dictKeys[0]] === 3 && dict[dictKeys[1]] === 2)
	)
		return 25;
	return 0;
}

function checkSmallStraight(diceValues) {
	const diceSet = new Set(getRawDiceValues(diceValues));
	console.log(diceSet);
	if (diceSet.has(2) && diceSet.has(3) && diceSet.has(4) && (diceSet.has(5) || diceSet.has(1)))
		return 30;
	if (diceSet.has(3) && diceSet.has(4) && diceSet.has(5) && diceSet.has(6)) return 30;
	return 0;
}

function checkLargeStraight(diceValues) {
	const dict = countFrequency(diceValues);
	if (Object.keys(dict).length === 5) return 40;
	return 0;
}

function checkYahtzee(diceValues) {
	let currentValue = diceValues[0].value;
	for (let i = 1; i < diceValues.length; i++) {
		if (currentValue !== diceValues[i].value) return 0;
		currentValue = diceValues[i].value;
	}
	return 50;
}

function sumAllValues(diceValues) {
	let sum = 0;
	diceValues.forEach((element) => {
		sum += element.value;
	});
	return sum;
}

export {
	individualScore,
	checkThreeOfKind,
	checkFourOfKind,
	checkFullHouse,
	checkSmallStraight,
	checkLargeStraight,
	checkYahtzee,
	sumAllValues,
};
