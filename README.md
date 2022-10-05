# TypeSript pnpn monorepo for CLI app.

Note: *Starting over without Nx.*

- *use something in anger*: (humorous) to do or use something in a real situation

Note: **Giving up, this is too much work**

This is a test repo for an [nx workspace](https://nx.dev/).

Objectives:

- A cli app
- Uses external (npm packages):
  - `yargs`, `chalk`, `@root/walk` and `music-metadata`
- Separate functionality into libraries
- Demo:
  - `yargs` (command line parsing)
  - `@root/walk` (walks a directory tree)
  - `music-metadata` (reads metadata from audio files)
  - `chalk` (coloring console output)

## Setup

- pnpm
- typescript

```bash
mkdir pnpm-cli-in-anger
cd pnpm-cli-in-anger
```

## packages

- `command`: typescript cli app
- `???`: typescript library
