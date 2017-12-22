"use strict";

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

module.exports = function(options) {
  options = options || {};
  var targets = options.targets ? options.targets : [];
  var silent = options.silent === true;
  return {
    name: 'cleaner',
    ongenerate: function(details) {
      var normalisedPath;
      if (targets && targets.length) {
        for (let i = 0; i < targets.length; i++) {
          normalisedPath = path.normalize(targets[i]);
          if (fs.existsSync(normalisedPath)) {
            !silent && console.log('cleaning path: ' + normalisedPath);
            rimraf.sync(normalisedPath);
          }
        }
      }
    }
  }
}
