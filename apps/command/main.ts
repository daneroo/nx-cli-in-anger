// import { greet } from '@pnpm-cli-in-anger/core';
import chalk from 'chalk';
import { parseFile } from 'music-metadata';

// no top level await for pkg
main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main(): Promise<void> {
  const greeting = 'Hello pnpm-cli-in-anger';
  console.log(chalk.blue(greeting));
  console.log(chalk.red(`cwd ${process.cwd()}`));
  const meta = await parseFile('robert-frost-the-road-not-taken.mp3');
  const { artist, album, title } = meta.common;
  console.log(JSON.stringify({ artist, album, title }, null, 2));
}
