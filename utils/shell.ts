import { execSync } from 'node:child_process';

export function runShellCommand(cmd: string) {
  execSync(cmd, { stdio: 'inherit' });
}
