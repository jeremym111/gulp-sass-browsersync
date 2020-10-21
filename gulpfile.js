const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const server = browserSync.create();

const paths = {
    styles: {
        src: './src/styles/**/*.scss',
        dest: './dist/styles/'
    }
};
const outputStyle = 'compressed'; // compressed, expanded, compact, nested
const mapAddComment = true;
const autoprefixerOpts = {
    flexbox: true,
    grid: false,
    cascade: false
}

function serve(done) {
    server.init({
        server: {
            baseDir: './'
        }
    });
    done();
}

function build_styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: outputStyle}).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOpts))
        .pipe(sourcemaps.write('.', {addComment: mapAddComment}))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
}

function watch_styles() {
    gulp.watch(paths.styles.src, build_styles);
}

exports.default = gulp.series(serve, build_styles, watch_styles);
