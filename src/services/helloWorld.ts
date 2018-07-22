export const helloWorld = async (word?: String) => {
  if (word === 'BAD!') {
    throw Error('Bad word given');
  }

  return word ? `Hello ${word}!` : 'Hello Lambda World!';
};
