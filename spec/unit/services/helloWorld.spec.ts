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

  describe('with undefined input', () => {
    it('should not be null', async () => {
      const result = await helloWorld(undefined);
      expect(result).not.toBeNull();
    });

    it('should return generic message', async () => {
      const result = await helloWorld(undefined);
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
      await expect(helloWorld('BAD!')).rejects.toThrowError('Bad word given');
      await expect(helloWorld('BAD!')).rejects.toThrowError('BAD!');
    });
  });
});
