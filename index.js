'use strict'

const fs = require('fs')
const path = require('path')

// Plugin instances created together, such as the configs in one
// rollup.config.js array, share their targets. Each target is only cleaned by
// the first instance that builds, so later configs don't delete the bundles
// written by earlier ones.
let group

function isInside(child, parent) {
  const relative = path.relative(parent, child)
  return (
    relative !== '' &&
    relative !== '..' &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  )
}

async function clean(target, exclude) {
  if (
    exclude.some(excluded => target === excluded || isInside(target, excluded))
  ) {
    return
  }
  if (!exclude.some(excluded => isInside(excluded, target))) {
    await fs.promises.rm(target, { recursive: true, force: true })
    return
  }
  // Something inside target is excluded, so remove its other entries instead.
  // Symlinks are left alone rather than followed.
  const stats = await fs.promises.lstat(target)
  if (stats.isDirectory()) {
    for (const entry of await fs.promises.readdir(target)) {
      await clean(path.join(target, entry), exclude)
    }
  }
}

module.exports = function({ targets = [], exclude = [], silent = true } = {}) {
  if (!group || group.started) {
    group = { started: false, owners: new Map() }
  }
  const shared = group
  const excludedPaths = exclude.map(excludedPath => path.resolve(excludedPath))

  const plugin = {
    name: 'cleaner',
    async buildStart(options) {
      shared.started = true
      for (const targetPath of targets) {
        const normalisedPath = path.normalize(targetPath)
        const resolvedPath = path.resolve(targetPath)
        if (!shared.owners.has(resolvedPath)) {
          shared.owners.set(resolvedPath, plugin)
        }
        if (shared.owners.get(resolvedPath) !== plugin) {
          continue
        }
        if (fs.existsSync(normalisedPath)) {
          if (!silent) {
            console.log(`cleaning path: ${normalisedPath}`)
          }
          await clean(resolvedPath, excludedPaths)
        }
      }
    },
  }
  return plugin
}
