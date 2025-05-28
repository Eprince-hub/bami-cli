import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { TEMPLATE_DIR } from '../../utils/file';
import { logInfo } from '../../utils/logger';

export function runCreateTemplateCommand(name: string) {
  const filePath = join(TEMPLATE_DIR, `${name}.txt`);

  if (existsSync(filePath)) {
    console.error(`❌ Template already exists: ${filePath}`);
    process.exit(1);
  }

  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, `// Template for ${name}\n`);

  logInfo(`🆕 Created template: ${filePath}`);
}
