# 🚀 Bami CLI Release Guide

This checklist ensures safe and consistent releases to npm.

---

## ✅ Pre-Release Checklist

- [ ] Ensure all tests pass: `pnpm test
- [ ] Update version in `package.json` (`"version": "0.x.y"`)
- [ ] Run `pnpm build` to generate the latest `dist/`
- [ ] Test locally with `pnpm link` or `npx .` from a fresh project
- [ ] Update `README.md` if needed
- [ ] Ensure `.gitignore` and `.npmignore` are correct
- [ ] Commit all changes: `git commit -am "Release v0.x.y"`
- [ ] Tag the release: `git tag v0.x.y && git push --tags`

---

## 🚀 Publishing to npm

```bash
# Log in to npm if needed
npm login

# Build CLI
pnpm build

# Publish
npm publish --access public
```
