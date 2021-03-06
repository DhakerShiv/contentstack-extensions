const gulp          = require('gulp')
const inline        = require('gulp-inline')
const uglify        = require('gulp-uglify')
const gulpStylelint = require('gulp-stylelint')
const minifyCss     = require('gulp-minify-css')
const babel         = require('gulp-babel')
const eslint        = require('gulp-eslint')

gulp.task('lint-js', () => {
  return gulp.src('src/*.js')
    .pipe(eslint({
      configFile: "./eslint.json"
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('lint-css', () => {
  return gulp
    .src('src/*.css')
    .pipe(gulpStylelint({
      config: {
        extends: 'stylelint-config-standard'
      },
      reporters: [{
        formatter: 'string',
        console: true
      }],
      failAfterError: false
    }))
})

gulp.task('inline', () => {
  return gulp.src('./src/index.html')
    .pipe(inline({
      js: [babel({
        presets: ['es2015']
      }), uglify],
      css: [minifyCss],
      disabledTypes: ['svg', 'img']
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('build', gulp.series('lint-js', 'lint-css', 'inline'))
gulp.task('watch', () => gulp.watch('src/*', gulp.series('build')))
gulp.task('default', gulp.series('build'))