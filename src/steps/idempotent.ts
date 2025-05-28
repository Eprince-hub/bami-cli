import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

function safeRun() {
  const packageJsonPath = resolve(process.cwd(), 'package.json');
  if (!existsSync(packageJsonPath)) {
    console.error('❌ No package.json found. Are you in a Node project?');
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
      console.warn(`⚠️ Warning: ${file} already exists. Skipping creation.`);
    }
  }
}
