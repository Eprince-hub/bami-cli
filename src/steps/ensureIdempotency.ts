import fs from 'node:fs';
import path from 'node:path';

function ensureSafeToRun() {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ No package.json found. Are you in a Node project?');
    process.exit(1);
  }
}

export function ensureIdempotency() {
  ensureSafeToRun();

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
    if (fs.existsSync(file)) {
      console.warn(`⚠️ Warning: ${file} already exists. Skipping creation.`);
    }
  }
}
