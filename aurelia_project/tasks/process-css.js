import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import sass from 'gulp-sass';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(build.bundle());
}
