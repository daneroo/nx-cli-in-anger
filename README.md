# TypeSript pnpn monorepo for CLI app.

Note: *Starting over without Nx.*

- *use something in anger*: (humorous) to do or use something in a real situation

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
- eslint
- prettier

### pnpm and top level directory

Install pnpm globally, and add 

```bash
# 0- install pnpm with corepack
corepack prepare pnpm@latest --activate
# or homebrew
brew install pnpm

# set your shall's auto-completion
pnpm install-completion
```

Top level directory:
  
- create pnpm-workspace.yaml
- top level package.json

```json
"type": "module",
"private": true,
```

- many shared devDependencies (typescript, eslint, prettier...)
  - use `pnpm add -w -D` to add them to the root package.json
- top level targets:
  - `build` (TODO)
  - `preinstall` (build all packages)
  - `lint` (lint all packages)
  - `test` (test all packages)
  - `format:write` (prettier --write)
- top level typescript config
  - `tsconfig.json` and `tsconfig.build.json`
  - module/target: `esnext`
- top level eslint/prettier/editor config
  - `.eslintrc.cjs`
  - `.prettierrc`, `.prettierignore`, `.editorconfig`


### making an app / package

```bash
# create a first app
mkdir -p apps/command
cd apps/command
pnpm init
```

### typescript

```bash
pnpm add -D typescript
```

## packages

- `command`: typescript cli app
- `???`: typescript library

## References

- [pnpm](https://pnpm.io/)
- [a starter](https://github.com/iyorozuya/ts-monorepo)
  - ESM - EcmaScript Modules
  - pnpm - Performant NPM
  - ESLint - TypeScript ESLint
  - Prettier - Code formatter
  - Jest - Testing Framework
