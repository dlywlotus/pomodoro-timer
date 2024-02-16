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
