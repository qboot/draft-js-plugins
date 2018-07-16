const getWordAt = (string, position, mentionTrigger = '@') => {
  // Perform type conversions.
  const str = String(string);

  // eslint-disable-next-line no-bitwise
  const pos = Number(position) >>> 0;

  const left = str.slice(0, pos).lastIndexOf(mentionTrigger) + 1;

  // Return the word, using the located bounds to extract it from the string.
  return {
    word: str.slice(left, pos),
    begin: left,
    end: pos,
  };
};

export default getWordAt;
