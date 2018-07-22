import { ArgumentError } from '../utils/errors';

class IllegalWordError extends ArgumentError {
  constructor(word: string) {
    super(`Bad word given: '${word}'`);
  }
}

export const helloWorld = async (word?: string) => {
  console.log(`helloWorld: ${word}`);

  if (word === 'BAD!') {
    console.log(`helloWorld bad word: ${word}`);
    throw new IllegalWordError(word);
  }

  return word ? `Hello ${word}!` : 'Hello Lambda World!';
};
