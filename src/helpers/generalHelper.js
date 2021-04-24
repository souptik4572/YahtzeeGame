function pickRandomValue() {
    return Math.floor(Math.random() * 6) + 1;
}

const numberWords = ['one', 'two', 'three', 'four', 'five', 'six'];

function numberToWords(number) {
    return numberWords[number-1];
}

export { pickRandomValue, numberToWords };