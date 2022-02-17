const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const minifycss = require("gulp-minify-css");
const rename = require("gulp-rename");
const notify = require("gulp-notify");
const livereload = require("gulp-livereload");
const lr = require("tiny-lr");
const server = lr();
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(livereload(server))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./assets"))
    .pipe(notify({ message: "Scripts task complete" }));
});

gulp.task("styles", function () {
  return gulp
    .src("./src/css/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), postcssPresetEnv()]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(minifycss())
    .pipe(livereload(server))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./assets"))
    .pipe(notify({ message: "Styles task complete" }));
});

// Watch
gulp.task("watch", function () {
  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch("src/css/**/*.css", gulp.series("styles"));
    gulp.watch("src/js/**/*.js", gulp.series("scripts"));
  });
});
