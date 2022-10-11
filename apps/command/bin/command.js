#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { main } from '../dist/main.js';
try {
  await main();
} catch (err) {
  console.error('Done with error:', err);
  process.exit(1);
}
