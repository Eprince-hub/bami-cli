import { readFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { copyTemplate, readTemplate } from '../utils/file';

const TEMP_DEST = join(__dirname, 'temp.txt');

describe('Template Utilities', () => {
  it('reads a template file', () => {
    const content = readTemplate('env.txt');
    expect(content).toContain('');
  });

  it('copies a template to destination', () => {
    copyTemplate('env.txt', TEMP_DEST);
    const copied = readFileSync(TEMP_DEST, 'utf-8');
    expect(copied).toContain('');
    unlinkSync(TEMP_DEST);
  });
});
