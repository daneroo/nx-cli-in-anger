import * as url from 'node:url';
import yargs from 'yargs/yargs';
import chalk from 'chalk';
import { getSizeOfFile, getMeta } from '@nx-cli-in-anger/shared';

const defaultFilePath = 'robert-frost-the-road-not-taken.mp3';

// we use this construction so we can import this file in tests
// see https://exploringjs.com/nodejs-shell-scripting/ch_nodejs-path.html#detecting-if-module-is-main
if (import.meta.url.startsWith('file:')) {
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    main().catch((error) => {
      console.error(error);
      process.exit(1);
    });
  }
}

export async function main(): Promise<void> {
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
  // 3- use music-metadata to get the metadata from an mp3 file
  const meta = await getMeta(file);
  // 4- chalk to color the output
  showWithColor({ fileInfo, meta });
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
