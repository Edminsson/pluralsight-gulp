var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var wiredep = require('wiredep').stream;

var $ = require('gulp-load-plugins')({rename: {'gulp-jscs-stylish': 'stylish'}});

gulp.task('vet', function() {
    log('Analyzing source with JSHint och JSCS');
    return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.stylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish',{verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'],  function() {
    log('Compiling less --> CSS to ' + config.temp);
    return gulp
    .src(config.less)
    .pipe($.plumber())
    .pipe($.if(args.verbose, $.print()))
    .pipe($.less())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function() {
    //This task does not return a stream and needs some other way of telling when it's done.
    //In the course John uses the done function that was send as a second parameter to the del-function to do this.
    //It didn't work for me because I'm using a newer version of del that uses promises and I can return the result
    //from the del function.
    var files = config.temp + '/**/*.css';
    log('Cleaning: ' + files);
    return del(files);
});

gulp.task('less-watcher', function() {
    gulp.watch(config.less, ['styles']);
});

gulp.task('wiredep', function() {
    var options = config.getWiredepDefaultOptions();
    gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
});

////////////////
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}
