import { logInfo } from '../../utils/logger';
import { detectPackageManager } from '../../utils/packageManager';
import { runShellCommand } from '../../utils/shell';

export function installDependencies() {
  const pkgManager = detectPackageManager();

  const deps = ['postgres', 'ley', 'dotenv-safe', 'tsx'];

  logInfo(`📦 Installing dependencies using ${pkgManager}...`);

  let installCmd = '';
  switch (pkgManager) {
    case 'pnpm':
      installCmd = `pnpm add ${deps.join(' ')}`;
      break;
    case 'yarn':
      installCmd = `yarn add ${deps.join(' ')}`;
      break;
    case 'npm':
    default:
      installCmd = `npm install ${deps.join(' ')} --save`;
      break;
  }

  runShellCommand(installCmd);
}
