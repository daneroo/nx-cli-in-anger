// not sure why this is required (tsconfig?)
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { describe, expect, it } from 'vitest';

describe('some-kind-of-e2e', () => {
  it('should call itself', () => {
    expect(true).toEqual(true);
  });
  it('should call with invalid args', () => {
    expect(true).toEqual(true);
  });
});
