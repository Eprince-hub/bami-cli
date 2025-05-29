# 🚀 Bami CLI Release Guide

This checklist ensures safe and consistent releases to npm.

---

## ✅ Pre-Release Checklist

- [ ] Ensure all tests pass: `pnpm test
- [ ] Update version in `package.json` (`"version": "0.x.y"`)
- [ ] Run `pnpm clean` to remove old build artifacts
- [ ] Run `pnpm build` to generate the latest `dist/`
- [ ] Test locally with `pnpm link` or `npx .` from a fresh project
- [ ] Update `README.md` if needed
- [ ] Ensure `.gitignore` and `.npmignore` are correct
- [ ] Commit all changes: `git commit -am "Release v0.x.y"`
- [ ] Tag the release: `git tag v0.x.y && git push --tags`

---

## 🔧 Bumping Version Number

To update the version number, follow these steps:

1. Open `package.json`.
2. Update the `"version"` field to the new version (e.g., `"0.x.y"`).
3. Save the file.
4. Commit the change: `git commit -am "Bump version to v0.x.y"`
5. Tag the commit: `git tag v0.x.y`
6. Push the tag: `git push --tags`

OR

You can use `pnpm version` to automate this:

```bash
pnpm version patch -m "🔖 release v%s" # For patch releases
pnpm version minor -m "🔖 release v%s" # For minor releases
pnpm version major -m "🔖 release v%s" # For major releases
```

---

## 🚀 Publishing to npm

```bash
# Build CLI
pnpm build

# Log in to npm if needed
pnpm login

# Check current user
pnpm whoami

# Publish
pnpm publish --access public

# Verify the release
pnpm view bami-cli@latest
```
