import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { entriesIgnore } from '../utils/gitignore';

const TEST_GITIGNORE = path.join(__dirname, '.gitignore');

describe('Gitignore Utility', () => {
  it('adds new entries without overwriting', () => {
    fs.writeFileSync(TEST_GITIGNORE, 'existing-entry\n');
    entriesIgnore(['.env', 'node_modules']);

    const contents = fs.readFileSync(TEST_GITIGNORE, 'utf-8');
    expect(contents).toMatch(/existing-entry/);
    expect(contents).toMatch(/\.env/);
    expect(contents).toMatch(/node_modules/);

    fs.unlinkSync(TEST_GITIGNORE);
  });
});
