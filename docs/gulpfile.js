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
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminGiflossy = require('imagemin-giflossy');
const imageminMozjpeg = require('imagemin-mozjpeg');


gulp.task('default', ['js-min', 'css-min', 'image-min']);

//scripts minification/concat multi src/dist
gulp.task('js-min', function() {
    var mainJsScripts = gulp.src('../src/js/*.js')
        .pipe(jshint())
        .pipe(gulp.dest('./js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'))

    var pizzaJsScripts = gulp.src('../src/views/js/*.js')
        .pipe(jshint())
        .pipe(gulp.dest('./views/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./views/js/'))

    return merge(mainJsScripts, pizzaJsScripts);
});
//CSS minification - multi src/dist folders
gulp.task('css-min', function() {
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

// lossy image compression, multi src/dist folder
gulp.task('image-min', function() {
    var mainPics = gulp.src(['../src/img/*.{gif,png,jpg}'])
        .pipe(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: 98 //lossy settings
            }),
            imageminZopfli({
                more: true
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 40
            })
        ]))
        .pipe(gulp.dest('./img/'));

    var pizzaPics = gulp.src(['../src/views/images/*.{gif,png,jpg}'])
        .pipe(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: 98 //lossy settings
            }),
            imageminZopfli({
                more: true
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 15
            })
        ]))
        .pipe(gulp.dest('./views/images/'));

    return merge(mainPics, pizzaPics);
});


