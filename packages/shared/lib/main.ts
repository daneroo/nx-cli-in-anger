import { promises as fs } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

export const greet = (name: string): string => {
  return `Hello ${name}!`;
};

// use node:fs to read the file size
export async function getSizeOfFile(
  filepath: string
): Promise<{ path: string; basename: string; dirname: string; size: number }> {
  const stats = await fs.stat(filepath);
  const absPath = resolve(filepath);
  return {
    path: absPath,
    basename: basename(filepath),
    dirname: dirname(absPath),
    size: stats.size,
  };
}
