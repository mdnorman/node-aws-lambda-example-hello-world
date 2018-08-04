import { helloWorld } from '../../../src/services/helloWorld';
import { ArgumentError } from '../../../src/utils/errors';

describe('helloWorld', () => {
  describe('with no input', () => {
    it('should not be null', async () => {
      const result = await helloWorld();
      expect(result).not.toBeNull();
    });

    it('should return generic message', async () => {
      const result = await helloWorld();
      expect(result).toEqual('Hello Lambda World!');
    });
  });

  describe('with null input', () => {
    it('should not be null', async () => {
      const result = await helloWorld(null);
      expect(result).not.toBeNull();
    });

    it('should return generic message', async () => {
      const result = await helloWorld(null);
      expect(result).toEqual('Hello Lambda World!');
    });
  });

  describe('with blank input', () => {
    it('should not be null', async () => {
      const result = await helloWorld('  ');
      expect(result).not.toBeNull();
    });

    it('should return generic message', async () => {
      const result = await helloWorld('  ');
      expect(result).toEqual('Hello Lambda World!');
    });
  });

  describe('with word', () => {
    it('should not be null', async () => {
      const result = await helloWorld('Joe');
      expect(result).not.toBeNull();
    });

    it('should return custom message', async () => {
      const result = await helloWorld('Joe');
      expect(result).toEqual('Hello Joe!');
    });
  });

  describe('with bad input', () => {
    it('should throw error', async () => {
      try {
        const result = await helloWorld('BAD!');
        fail(`No error thrown. Got result: ${result}`);
      } catch (e) {
        expect(e).not.toBeNull();
        expect(e).toEqual(jasmine.any(ArgumentError));
        expect(e.message).toContain('Bad word given');
        expect(e.message).toContain('BAD!');
      }
    });
  });
});
