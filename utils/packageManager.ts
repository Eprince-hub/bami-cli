import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function detectPackageManager(): 'pnpm' | 'yarn' | 'npm' {
  const cwd = process.cwd();
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
}
