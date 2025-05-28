import { logInfo } from '../../utils/logger';
import { createFiles } from '../steps/createFiles';
import { idempotent } from '../steps/idempotent';
import { installDependencies } from '../steps/installDeps';
import { updatePackageJsonScripts } from '../steps/updatePackageJson';

export async function runInitCommand() {
  try {
    logInfo('🔍 Checking project safety...');
    idempotent();
    installDependencies();

    logInfo('📁 Creating configuration and environment files...');
    createFiles();

    logInfo('📄 Updating package.json scripts...');
    updatePackageJsonScripts();

    logInfo('✅ Setup complete!');
  } catch (error) {
    console.error(`❌ Error: ${(error as Error).message}`);
  }
}
