var gulp                = require('gulp'),
    less                = require('gulp-less'),
    sass                = require('gulp-sass'),
    minifycss           = require('gulp-minify-css'),
    uglify              = require('gulp-uglify'),
    concat              = require('gulp-concat'),
    browserify          = require('browserify'),
    hbsfy               = require('hbsfy'),
    watchify            = require('watchify'),
    vinylBuffer         = require('vinyl-buffer'),
    vinylSourceStream   = require('vinyl-source-stream'),
    browserSync         = require('browser-sync').create(),
    reload              = browserSync.reload;

hbsfy.configure({
    extensions: ['hbs']
});

var bundler = browserify({
    entries: ['./public/js/entry.js'],
    cache: {},
    packageCache: {},
    fullPaths: false,
    debug: false,
    paths: [
        './node_modules',
        './public/tpl',
        './public/js/'
    ],
    transform: [hbsfy]
});

gulp.task('browserify', function () {
    return bundler.bundle()
        .pipe(vinylSourceStream('bundle.js'))
        .pipe(vinylBuffer())
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('production', function () {
    return bundler.bundle()
        .pipe(vinylSourceStream('bundle.js'))
        .pipe(vinylBuffer())
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('watchify', function () {
    var watcher = watchify(bundler);

    function rebundle() {
        console.log((new Date()).toString().slice(16, 24), 'Running watchify');
        return watcher.bundle()
            .pipe(vinylSourceStream('bundle.js'))
            .pipe(vinylBuffer())
            .pipe(gulp.dest('./public/dist'));
    }

    bundler.on('update', rebundle);
    return rebundle();
});

gulp.task('css', function () {
    return gulp.src(['./public/css/app.less'])
        .pipe(less())
        .pipe(minifycss({keepSpecialComments: 0}))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('css-watch', function () {
    gulp.watch(['./public/css/app.less',
                './public/css/**/*.less'], ['css']);
});

gulp.task('images', function () {
    return gulp.src('./public/images/')
        .pipe(gulp.dest('public/dist/images'));
});

gulp.task('browserify', function () {
    browserSync.init({
        proxy: 'http://localhost:3000',
        files: ['public/dist/*.*'],
        port: 7000
    });
    gulp.watch('*.css').on('change', reload);
});

gulp.task('sass', function () {
    return gulp.src('./public/css/app.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', ['browserify', 'watchify', 'css-watch', 'browserify']);
