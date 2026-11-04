'use strict'

const fs = require('fs')
const path = require('path')

module.exports = function({ targets = [], silent = true } = {}) {
  return {
    name: 'cleaner',
    async buildStart(options) {
      for (const targetPath of targets) {
        const normalisedPath = path.normalize(targetPath)
        if (fs.existsSync(normalisedPath)) {
          if (!silent) {
            console.log(`cleaning path: ${normalisedPath}`)
          }
          await fs.promises.rm(normalisedPath, { recursive: true, force: true })
        }
      }
    },
  }
}
