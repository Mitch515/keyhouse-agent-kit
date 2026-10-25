#!/usr/bin/env node
// Published builds run without a TypeScript loader. The private workspace uses tsx.
import { existsSync } from 'node:fs';
const built = new URL('../dist/keyhouse.mjs', import.meta.url);
if (existsSync(built)) await import(built.href);
else {
  const { register } = await import('node:module');
  register('tsx/esm', import.meta.url);
  await import('../cli/index.ts');
}
