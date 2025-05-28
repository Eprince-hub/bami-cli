import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { copyTemplate, readTemplate } from '../../utils/file';
import { entriesIgnore } from '../../utils/gitignore';
import { logInfo } from '../../utils/logger';

function appendEnvIfMissingFromTemplate(
  filePath: string,
  templateName: string,
) {
  const templateContent = readTemplate(templateName);

  const existingContent = existsSync(filePath)
    ? readFileSync(filePath, 'utf-8')
    : '';

  const existingKeys = new Set(
    existingContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => line.split('=')[0]),
  );

  const newLines = templateContent.split(/\r?\n/).filter((line) => {
    const key = line.trim().split('=')[0];
    return key && !existingKeys.has(key);
  });

  if (newLines.length > 0) {
    appendFileSync(filePath, `\n${newLines.join('\n')}\n`);

    const addedKeys = newLines.map((line) => line.trim().split('=')[0]);
    logInfo(
      `📝 Updated ${filePath} with missing env variables: ${addedKeys.join(
        ', ',
      )}`,
    );
  } else if (!existsSync(filePath)) {
    writeFileSync(filePath, templateContent);
    logInfo(`🆕 Created new ${filePath} from template`);
  } else {
    logInfo(
      `⚠️ No new env variables added to ${filePath} (already up to date)`,
    );
  }
}

export function createFiles() {
  appendEnvIfMissingFromTemplate('.env', 'env.txt');
  appendEnvIfMissingFromTemplate('.env.example', 'env.example.txt');

  mkdirSync('migrations', { recursive: true });
  mkdirSync('database', { recursive: true });
  mkdirSync('util', { recursive: true });

  if (!existsSync('util/config.js'))
    copyTemplate('util/config.js.txt', 'util/config.js');

  if (!existsSync('ley.config.js'))
    copyTemplate('ley.config.js.txt', 'ley.config.js');

  if (!existsSync('database/connect.ts'))
    copyTemplate('database/connect.ts.txt', 'database/connect.ts');

  entriesIgnore(['.env', 'node_modules']);
}
