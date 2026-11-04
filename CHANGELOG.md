# Changelog

## Unreleased

- Add an `exclude` option to keep files and directories inside the targets (#3).
- When several configs in an array share a target, only the first one cleans it, so later configs no longer delete earlier bundles (#4).

## 2.0.0 &ndash; November 4, 2026

- BREAKING CHANGE: Require Node 14.14+.
- Replace `rimraf` with Node's built-in `fs.promises.rm`, fixing security alerts in its `glob` dependencies.

## 1.0.0 &ndash; July 1, 2019

- BREAKING CHANGE: Require Rollup 1.0+.
- BREAKING CHANGE: Require Node 8+.
- Declare peer and engine dependency.
- Use Rollup 1.0 plugin API.
- Run the hook synchronously.
- Remove unused dependencies.
