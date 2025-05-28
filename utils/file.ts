import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TEMPLATE_DIR = join(__dirname, 'templates');

export function copyTemplate(templateName: string, destPath: string) {
  const sourcePath = join(TEMPLATE_DIR, templateName);
  const content = readFileSync(sourcePath, 'utf-8');
  writeFileSync(destPath, content);
}

export function readTemplate(templateName: string): string {
  const templatePath = join(TEMPLATE_DIR, templateName);
  return readFileSync(templatePath, 'utf-8');
}
