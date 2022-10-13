#!/usr/bin/env node

// This is the "bin" entrypoint
import { main } from './dist/index.mjs';
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
