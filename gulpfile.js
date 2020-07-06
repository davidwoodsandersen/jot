const fs = require('fs');
const gulp = require('gulp');
const browserify = require('browserify');

function build() {
  return browserify('./client/src/index.js')
    .transform('babelify', {
      presets: ['@babel/env']
    })
    .bundle()
    .pipe(fs.createWriteStream('./client/dist/bundle.js'));
}

exports.build = build;
