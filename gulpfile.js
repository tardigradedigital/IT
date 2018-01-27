// var del = require('del'),
// gulp = require('gulp'),
// bump = require('gulp-bump'),
// concat = require('gulp-concat'),
// sourcemaps = require('gulp-sourcemaps'),
// cleancss = require('gulp-clean-css'),
// stylus = require('gulp-stylus'),
// uglify = require('gulp-uglify'),
// ngAnnotate = require('gulp-ng-annotate'),
// prompt = require('gulp-prompt'),
// runseq = require('run-sequence'),
// exec = require('child_process').exec;

var gulp = require('gulp'),
    bump = require('gulp-bump'),
    concat = require('gulp-concat'),
    cleancss = require('gulp-clean-css'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');


// 3p : [ON-DEMAND]; Concatenates specified third party JS to a single file
gulp.task('3p', function() {
    gulp.src([
        'public/vendor/jquery/dist/jquery.min.js',
        'public/vendor/jquery-ui/jquery-ui.min.js',
        // 'public/vendor/modernizr/dist/modernizr.min.js',
        'public/vendor/popper.js/dist/umd/popper.min.js',
        'public/vendor/bootstrap/dist/js/bootstrap.min.js',
        // 'public/vendor/event-source-polyfill/eventsource.min.js',
        'public/vendor/angular/angular.min.js',
        'public/vendor/angular-resource/angular-resource.min.js',
        'public/vendor/angular-route/angular-route.min.js',
        'public/vendor/angular-animate/angular-animate.min.js',
        // 'public/vendor/angular-preload-image/angular-preload-image.min.js',
        'public/vendor/angular-sanitize/angular-sanitize.min.js',
        'public/vendor/angular-ui-select/dist/select.min.js',
        'public/vendor/angular-filter/dist/angular-filter.min.js'
        // 'public/vendor/angular-file/angular-file.js',
        // 'public/vendor/chart.js/dist/Chart.min.js',
        // 'public/vendor/angular-chart.js/dist/angular-chart.min.js',
        // 'public/vendor/inobounce/inobounce.min.js',
    ])
    .pipe(concat('3p.js'))
    .pipe(gulp.dest('public/js/'))
})

// build : [ON-DEMAND]; Used from command line to launch deploy task
// gulp.task('build', function() {
// runseq('deployclean', ['deploy']);
// })

// bump : [AUTO]; Increments version in package.json
gulp.task('bumpv', function() {
gulp.src('package.json')
.pipe(bump())
.pipe(gulp.dest('./'));
})

// css : [AUTO]; Minifies and concatenates specified first and third party CSS
gulp.task('css', function () {
gulp.src([
'public/vendor/bootstrap/dist/css/bootstrap.min.css',
// 'public/vendor/iconic/font/css/iconic-bootstrap.css',
'public/vendor/angular-ui-select/dist/select.min.css',
'public/vendor/jquery-ui/themes/base/jquery-ui.min.css',
'public/css/site.css'
])
.pipe(cleancss({
level: {2: {all: true}},
keepSpecialComments: false
}))
.pipe(concat('app.css'))
.pipe(gulp.dest('public/css/'));
})

// deploy: [AUTO]; Generates file structure for deploying to production
// gulp.task('deploy', ['jsmin', 'bumpv'], function() {
// gulp.src([
// 'public/app/**/*.jade',
// 'public/app/app.js',
// 'public/css/app.css',
// 'public/fonts/*.*',
// 'public/img/*.*',
// 'public/js/*.*',
// 'server/**/*.*',
// '!server/**/backup/*.*',
// 'package.json',
// 'server.js'
// ], {base: '.'})
// .pipe(gulp.dest('deploy/'));

// exec('powershell -file deploy.ps1'), function(err, stdout, stderr) {
// console.log('PS ', err, stdout, stderr);
// }
// });

// deployclean: [AUTO]; Removes previously generated deployment files
// gulp.task('deployclean', function() {
// del.sync('deploy/**', {force: true});
// })

// fullbuild : [ON-DEMAND]; Used from command line to launch full deploy task
// gulp.task('fullbuild', function() {
// runseq('deployclean', ['fulldeploy']);
// })

// fulldeploy: [AUTO]; Generates file structure for fully deploying to production
// gulp.task('fulldeploy', ['jsmin', 'bumpv'], function() {
// gulp.src([
// 'node_modules/**/*.*',
// 'public/app/**/*.jade',
// 'public/app/app.js',
// 'public/css/app.css',
// 'public/fonts/*.*',
// 'public/img/*.*',
// 'public/js/*.*',
// 'public/vendor/**/*.*',
// 'server/**/*.*',
// '!server/**/backup/*.*',
// 'package.json',
// 'README',
// 'server.js',
// 'svcin.js',
// 'svcun.js'
// ], {base: '.'})
// .pipe(gulp.dest('deploy/'));

// exec('powershell -file fulldeploy.ps1'), function(err, stdout, stderr) {
// console.log('PS ', err, stdout, stderr);
// }
// });

// go: [ON-DEMAND]; Used from command line to launch watch task
gulp.task('go', ['watch']);

// js: [AUTO]; Concatenates all first party Angular components, minifies, and optionally generates sourcemaps
gulp.task('js', function () {
gulp.src(['!public/app/app.js', 'public/app/stage.js','public/app/**/*.js', '!public/js/3p.js'])
.pipe(sourcemaps.init())
.pipe(concat('app.js'))
.pipe(ngAnnotate())
.pipe(uglify())
.pipe(sourcemaps.write())
.pipe(gulp.dest('public/app/'))
})

// jsmin: [AUTO]; Concatenates all first party Angular components and minifies
// gulp.task('jsmin', function () {
// gulp.src(['!public/app/app.js', 'public/app/stage.js','public/app/**/*.js', '!public/js/3p.js'])
// .pipe(concat('app.js'))
// .pipe(ngAnnotate())
// .pipe(uglify())
// .pipe(gulp.dest('public/app/'))
// })

// styl: [AUTO]; Compiles Stylus CSS to a CSS file
gulp.task('styl', function() {
gulp.src('public/css/site.styl')
.pipe(stylus())
.pipe(gulp.dest('public/css'))
})

// watch: [AUTO]; Configures Gulp for watching and automatically launching build tasks on file changes
gulp.task('watch', ['js', 'css', 'styl'], function () {
    gulp.watch(['public/app/**/*.js', '!public/app/app.js'], ['js']);
    gulp.watch('public/css/site.styl', ['styl']);
    gulp.watch([
        'public/vendor/bootstrap/dist/css/bootstrap.min.css',
        // 'public/vendor/iconic/font/css/iconic-bootstrap.css',
        'public/css/site.css',
        'public/vendor/angular-ui-select/dist/select.min.css',
        'public/vendor/jquery-ui/themes/base/jquery-ui.min.css'
    ], ['css']);
})