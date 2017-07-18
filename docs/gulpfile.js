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


gulp.task('default', function() {
    // place code for your default task here
    console.log("Our first hello world gulp task!");
});

gulp.task('watch', function() {
    // gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
    // gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('../src/js/*.js', ['compress-js']);

});

//scripts minification/concat multi src/dist
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
//CSS minification - multi src/dist folders
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

//lossy image compression, single src/dist folder

// gulp.task('imagemin', function() {
//     return gulp.src(['../src/img/*.{gif,png,jpg}'])
//         .pipe(imagemin([
//             //png
//             imageminPngquant({
//                 speed: 1,
//                 quality: 98 //lossy settings
//             }),
//             imageminZopfli({
//                 more: true
//             }),
//             //gif
//             // imagemin.gifsicle({
//             //     interlaced: true,
//             //     optimizationLevel: 3
//             // }),
//             //gif very light lossy, use only one of gifsicle or Giflossy
//             imageminGiflossy({
//                 optimizationLevel: 3,
//                 optimize: 3, //keep-empty: Preserve empty transparent frames
//                 lossy: 2
//             }),
//             //svg
//             imagemin.svgo({
//                 plugins: [{
//                     removeViewBox: false
//                 }]
//             }),
//             //jpg lossless
//             imagemin.jpegtran({
//                 progressive: true
//             }),
//             //jpg very light lossy, use vs jpegtran
//             imageminMozjpeg({
//                 quality: 90
//             })
//         ]))
//         .pipe(gulp.dest('./img/'));
// });

//lossy image compression, multi src/dist folder

gulp.task('imagemin', function() {
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
                quality: 40
            })
        ]))
        .pipe(gulp.dest('./views/images/'));

    return merge(mainPics, pizzaPics);
});


