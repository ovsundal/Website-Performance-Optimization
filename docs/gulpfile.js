var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
const jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var merge = require('merge-stream');

gulp.task('default', function() {
    // place code for your default task here
    console.log("Our first hello world gulp task!");
});

gulp.task('watch', function() {
    // gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
    // gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('../src/js/*.js', ['compress-js']);

});

gulp.task('scripts', function() {
    var mainJsScripts = gulp.src('../src/js/*.js')
        .pipe(jshint())
        .pipe(gulp.dest('./js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'))
        .pipe(concat('scripts.js'))
        .pipe(rename({ suffix: '.concat' }))
        .pipe(gulp.dest('./js/'))
    // .pipe(notify({ message: 'Scripts task complete' }));

    var pizzaJsScripts = gulp.src('../src/views/js/*.js')
        .pipe(jshint())
        .pipe(gulp.dest('./views/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./views/js/'))

    return merge(mainJsScripts, pizzaJsScripts);
});

gulp.task('styles', function() {
    var mainCss = gulp.src('../src/css/*.css')
        .pipe(gulp.dest('./css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./css/'))
    // .pipe(notify({ message: 'Styles task complete' }));

    var pizzaCss = gulp.src('../src/views/css/*.css')
        .pipe(gulp.dest('./views/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./views/css/'))

    return merge(mainCss, pizzaCss);
});

//minify images lossless
gulp.task('image', function() {
    gulp.src('../src/img/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest('./img/'))

         gulp.src('../src/views/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest('./views/images/'))
    });


