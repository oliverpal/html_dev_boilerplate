
const gulp = require("gulp"),
sass = require("gulp-sass"),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
cssnano = require("cssnano"),
sourcemaps = require("gulp-sourcemaps"),
browserSync = require("browser-sync").create();

//define paths
const paths = {
    styles: {
        src: "src/scss/*.scss",
        dest: "public/css"
    }
}

//function for style processing
const style = () => {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
    );
}

//watch function
const watch = () => { 
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch(paths.styles.src, style)
}
 
module.exports = {
    style,
    watch
}