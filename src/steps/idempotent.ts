import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { logError, logWarn } from '../../utils/logger';

function safeRun() {
  const packageJsonPath = resolve(process.cwd(), 'package.json');
  if (!existsSync(packageJsonPath)) {
    logError('No package.json found. Are you in a Node project?');
    process.exit(1);
  }
}

export function idempotent() {
  safeRun();

  const filesToCheck = [
    'ley.config.js',
    'tsconfig.json',
    '.env',
    '.env.example',
    '.gitignore',
    'migrations',
    'util/config.js',
    'database/connect.ts',
  ];

  for (const file of filesToCheck) {
    if (existsSync(file)) {
      logWarn(`Warning: ${file} already exists. Skipping creation.`);
    }
  }
}
