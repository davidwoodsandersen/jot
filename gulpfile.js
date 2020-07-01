const fs = require('fs');
const gulp = require('gulp');
const browserify = require('browserify');

function build() {
  return browserify('./src/index.js')
    .transform('babelify', {
      presets: ['@babel/env']
    })
    .bundle()
    .pipe(fs.createWriteStream('./dist/bundle.js'));
}

exports.build = build;
