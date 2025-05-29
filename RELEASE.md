# 🚀 Bami CLI Release Guide

This checklist ensures safe and consistent releases to npm.

---

## ✅ Pre-Release Checklist

- [ ] Check `main` branch is up-to-date: `git pull origin main`
- [ ] Ensure all tests pass: `pnpm test`
- [ ] Run static analysis (if applicable): `pnpm lint`
- [ ] Verify CI/CD pipeline is green (if applicable)

### 📦 Build & Verification

- [ ] Run `pnpm clean` to remove old build artifacts
- [ ] Run `pnpm build` to generate the latest `dist/`
- [ ] Verify build artifacts: `ls -la dist/`
- [ ] Test locally with `pnpm link` or `npx .` from a fresh project
- [ ] Run smoke tests of built package

### 📄 Documentation

- [ ] Update `CHANGELOG.md` (if maintained)
- [ ] Update `README.md` if needed (new features/flags)
- [ ] Verify all documentation links work

### 🔍 Final Checks

- [ ] Ensure `.gitignore` and `.npmignore` are correct
- [ ] Verify no sensitive data in package: `pnpm pack --dry-run`
- [ ] Check package contents: `tar -tvf *.tgz` (after dry-run)
- [ ] Review `package.json` for correct:
  - `main` entry point
  - `bin` entries
  - `files` whitelist
  - dependencies versions (`dependencies`, `peerDependencies`)

---

## 🔧 Version Bumping

### Manual Method

1. Open `package.json`
2. Update the `"version"` field (semver: `MAJOR.MINOR.PATCH`)
3. Save the file
4. Commit: `git commit -am "Release v0.x.y"`
5. Tag: `git tag v0.x.y`
6. Push: `git push origin main --tags`

### Automated Method (Recommended)

```bash
# For patch releases (bug fixes):
pnpm version patch -m "🔖 release v%s" && git push --tags

# For minor releases (new features):
pnpm version minor -m "🔖 release v%s" && git push --tags

# For major releases (breaking changes):
pnpm version major -m "🔖 release v%s" && git push --tags
```

---

## 🚀 Publishing to npm

### 🛡️ Pre-Publish Checks

```bash
pnpm config get registry
pnpm login
pnpm whoami
pnpm publish --dry-run
```

### 🚀 Publish

```bash
pnpm build
pnpm publish --access public
```

### ✅ Post-Publish

```bash
pnpm view bami-cli@latest
pnpm install -g bami-cli@latest
mkdir test-install && cd test-install
pnpm init -y && bami init
or
npx bami-cli init
```

## 🏷️ GitHub Release

1. Go to GitHub → Releases
2. Click "Draft new release"
3. Select tag
4. Add notes
5. Publish

## 🔄 Rollback

```bash
npm unpublish bami-cli@0.x.y
```

## 🛠️ Troubleshooting

- **403 Forbidden**: `pnpm whoami`
- **Version Mismatch**: Check `package.json` vs git tag
- **Missing Files**: Verify `files` in package.json
- **Build Issues**: Ensure `dist/` is up-to-date
