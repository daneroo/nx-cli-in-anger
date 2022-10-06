import yargs from 'yargs/yargs';

import chalk from 'chalk';
import { promises as fs } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { parseFile } from 'music-metadata';

const defaultFilePath = 'robert-frost-the-road-not-taken.mp3';

main()
  .then(() => {
    console.log('Done (without errors)');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Done with error:', err);
    process.exit(1);
  });

async function main(): Promise<void> {
  console.log('Hello node in Typescript!');
  // 1- use yargs to get the file parameter
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  const argv = await yargs(process.argv.slice(2))
    .option('file', {
      alias: 'f',
      type: 'string',
      demandOption: true,
      default: defaultFilePath,
      describe: 'Path of the file to examine',
    })
    .help()
    .parseAsync();

  // destructure arguments
  const { file } = argv;
  console.log(`About to examine file: ${file}`);
  // 2- use node:fs to read the file size
  const fileInfo = await getSizeOfFile(file);
  console.log({ fileInfo });
  // 3- use music-metadata to get the metadata from an mp3 file
  const meta = await getMeta(file);
  // 4- chalk to color the output
  showWithColor({ fileInfo, meta });
}

// use node:fs to read the file size
async function getSizeOfFile(
  filepath: string
): Promise<{ path: string; basename: string; dirname: string; size: number }> {
  const stats = await fs.stat(filepath);
  return {
    path: filepath,
    basename: basename(filepath),
    dirname: dirname(resolve(filepath)),
    size: stats.size,
  };
}

//  use music-metadata to get the metadata from an mp3 file
async function getMeta(filePath: string): Promise<{
  artist: string;
  title: string;
  album: string;
  duration: number;
  bitrate: number;
}> {
  const metadata = await parseFile(filePath);
  const { artist, title, album } = metadata.common;
  const { bitrate, duration } = metadata.format;
  return {
    artist: artist ?? 'unknown artist',
    title: title ?? 'unknown title',
    album: album ?? 'unknown album',
    duration: duration ?? 0,
    bitrate: bitrate ?? 0,
  };
}

// chalk to color the output
function showWithColor({
  fileInfo,
  meta,
}: {
  fileInfo: { path: string; basename: string; dirname: string; size: number };
  meta: {
    artist: string;
    title: string;
    album: string;
    duration: number;
    bitrate: number;
  };
}): void {
  const { basename, dirname, size } = fileInfo;
  const { artist, title, album, duration, bitrate } = meta;
  console.log(`
  ${chalk.bold.white('artist:')} ${chalk.green(artist)}
  ${chalk.bold.white('title:')} ${chalk.blue(title)}
  ${chalk.bold.white('album:')} ${album}
  ${chalk.bold.white('duration:')} ${durationToHMS(duration)}
  ${chalk.bold.white('bitrate:')} ${chalk.yellow(
    (bitrate / 1000).toFixed(1)
  )} kb/s
  ${chalk.bold.white('file:')} ${chalk.bold(basename)}
    ${chalk.bold.white('dir:')} ${dirname}
    ${chalk.bold.white('size:')} ${chalk.yellow((size / 1024).toFixed(1))} kB
  `);
}

//  Go style duration formatting
export function durationToHMS(seconds = 0): string {
  // assume seconds is an integer > 0
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}h${m}m${s}s`;
  }
  if (m > 0) {
    return `${m}m${s}s`;
  }
  return `${s}s`;
}
