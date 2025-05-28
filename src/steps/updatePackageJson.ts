import { readFileSync, writeFileSync } from 'node:fs';

export function updatePackageJsonScripts() {
  const pkgPath = 'package.json';
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  pkg.scripts = pkg.scripts || {};
  pkg.scripts.migrate = 'ley --require tsx/cjs';

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}
