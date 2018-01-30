var gulp = require('gulp');

var sass = require('gulp-sass');
var del = require('del');

var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

var ts = require('gulp-typescript');

var tsProject = ts.createProject("tsconfig.json");

var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

var paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/styles'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/scripts'
    },
    pages: ['src/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});
gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('sass', function () {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('scripts', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.scripts.dest));

});

gulp.task('default', ['clean'], function () {
    //gulp.run('scripts','styles');
    gulp.run('copy-html');
    return browserify({
            basedir: '.',
            debug: true,
            entries: ['src/scripts/ts/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
});