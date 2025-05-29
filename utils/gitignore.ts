import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { logInfo } from './logger';

export function entriesIgnore(entries: string[]) {
  const gitignorePath = resolve(process.cwd(), '.gitignore');

  let current = '';
  if (existsSync(gitignorePath)) {
    current = readFileSync(gitignorePath, 'utf8');
  }

  const toAdd = entries.filter((entry) => !current.includes(entry));
  if (toAdd.length === 0) return;

  const needsNewline = !current.endsWith('\n') && current.length > 0;
  const contentToAdd = (needsNewline ? '\n' : '') + toAdd.join('\n') + '\n';

  appendFileSync(gitignorePath, contentToAdd);
  logInfo(`➕ Added to .gitignore: ${toAdd.map((e) => e).join(', ')}`);
}
