import { getSizeOfFile, getMeta } from './main';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('getSizeOfFile', () => {
  it('should measure itself', async () => {
    const fileInfo = await getSizeOfFile(__filename);
    expect(fileInfo.basename).toEqual('main.spec.ts');
    expect(fileInfo.path).toContain('lib/main.spec.ts');
    expect(fileInfo.size).toBeGreaterThan(200);
  });
});

describe('getMeta', () => {
  it('should an good mp3 file', async () => {
    const meta = await getMeta(
      join(__dirname, 'robert-frost-the-road-not-taken.mp3')
    );
    expect(meta).toEqual({
      album: 'Poem of the Day from Poetry Foundation.org',
      artist: 'Robert Frost',
      bitrate: 64000,
      duration: 76.19918367346939,
      title: '"The Road Not Taken" by Robert Frost',
    });
    // expect(meta.basename).toEqual('main.spec.ts');
    // expect(fileInfo.path).toContain('lib/main.spec.ts');
    // expect(fileInfo.size).toBeGreaterThan(200);
  });
});
