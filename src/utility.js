export function toCamelCase(text) {
  const words = text.split(' ');
  return words
    .map((word, i) =>
      i > 0
        ? word[0].toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase()
    )
    .join('');
}

export function capitalise(text) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function toTitleCase(text) {
  const words = text.split('B');
  if (words.length === 1) return words[0][0].toUpperCase() + words[0].slice(1);
  else return words[0][0].toUpperCase() + words[0].slice(1) + ' B' + words[1];
}

export function isCapitalLetter(letter) {
  if (letter && letter.length === 1) {
    const expected = letter.toUpperCase();
    return expected === letter;
  }
  return false;
}
