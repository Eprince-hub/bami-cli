#!/usr/bin/env node

import { program } from 'commander';
import { runInitCommand } from './commands/init';
import { runCreateTemplateCommand } from './commands/local/createTemplate';

program
  .name('bami-cli')
  .description('Bootstrap repeated tasks during development')
  .usage('<command> [options]')
  .helpCommand('help', 'Display help for command')
  .version('0.1.0-beta.0', '-v, --version', 'Output the current version');

program
  .command('init')
  .description('Setup PostgreSQL and Ley migration structure')
  .option('-v, --verbose', 'Enable verbose logging')
  .action(() => {
    console.log('🎉 Initializing project...');
    runInitCommand();
  });

if (process.env.BAMI_DEV === '1') {
  program
    .command('create-template', { isDefault: false, hidden: true })
    .description('Create a new template file scaffold')
    .argument(
      '<name>',
      'Path for the new template file (e.g. database/connect.ts)',
    )
    .action(runCreateTemplateCommand);
}

program.parse(process.argv);
