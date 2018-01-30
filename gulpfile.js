
var gulp = require('gulp');

var sass = require('gulp-sass');
var del = require('del');

var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

var ts= require('gulp-typescript');

var tsProject= ts.createProject("tsconfig.json");

var paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/styles'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/scripts'
    }
};


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

gulp.task('script',function(){
    return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest(paths.scripts.dest));
            
});