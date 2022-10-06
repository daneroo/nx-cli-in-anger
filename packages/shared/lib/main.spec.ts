import { greet, getSizeOfFile } from './main';

test('prints Hello Chintu!', () => {
  expect(greet('Chintu')).toBe(`Hello Chintu!`);
});

test('prints Hello Zura!', () => {
  expect(greet('Zura')).toBe(`Hello Zura!`);
});

describe('getSizeOfFile', () => {
  it('should measure itself', async () => {
    const fileInfo = await getSizeOfFile(__filename);
    expect(fileInfo.basename).toEqual('main.spec.ts');
    expect(fileInfo.path).toContain('lib/main.spec.ts');
    expect(fileInfo.size).toBeGreaterThan(200);
  });
});
