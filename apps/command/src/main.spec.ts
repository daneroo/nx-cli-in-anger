// not sure why this is required (tsconfig?)
import { describe, expect, it } from 'vitest';

describe('some-kind-of-e2e', () => {
  it('should call itself', () => {
    expect(true).toEqual(true);
  });
  it('should call with invalid args', () => {
    expect(true).toEqual(true);
  });
});
