# nx-cli-in-anger

- *use something in anger*: (humorous) to do or use something in a real situation

This is a demonstration of a ESM/TypeScript pnpm monorepo for CLI app.

The monorepo was structured as a pnpm workspace, and nx was added for orchestration and caching

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

## TODO

- [ ] Move to vite
- [ ] Document configuration of (tsc,eslint,pnpm,nx,etc)
  - [ ] write validator for configuration properties

## Setup

- pnpm
- typescript
- eslint
- prettier
- vitest (replaced jest and ts-jest)

### pnpm and top level directory

Install pnpm globally, and add completion

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
- [tsconfig bases](https://github.com/tsconfig/bases)
- [a starter](https://github.com/iyorozuya/ts-monorepo)
  - ESM - EcmaScript Modules
  - pnpm - Performant NPM
  - ESLint - TypeScript ESLint
  - Prettier - Code formatter
  - Jest - Testing Framework - Replace by Vitest
