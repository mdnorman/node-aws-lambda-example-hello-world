import { ArgumentError } from '../utils/errors';
import { createServicesDebugLogger } from './logger';

const debug = createServicesDebugLogger('helloWorld');

class IllegalWordError extends ArgumentError {
  constructor(word: string) {
    super(`Bad word given: '${word}'`);
  }
}

export const helloWorld = async (word?: string) => {
  debug`helloWorld: ${word}`;

  if (word === 'BAD!') {
    debug`helloWorld bad word: ${word}`;
    throw new IllegalWordError(word);
  }

  return word && word.trim() ? `Hello ${word}!` : 'Hello Lambda World!';
};
