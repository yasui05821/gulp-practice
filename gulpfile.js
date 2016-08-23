var gulp = require("gulp");
var plumber = require("gulp-plumber");
var jade = require("gulp-jade");
var sass = require("gulp-sass");
var browser = require("browser-sync")

gulp.task("default",["watch"]);
gulp.task("build",["jade","sass"]);

gulp.task("jade",function(){
   gulp.src(["./frontend/assets/tmpl/**/*.jade","!./frontend/assets/tmpl/**/_*.jade"])
       .pipe(plumber())
       .pipe(jade({
          pretty: true
       }))
       .pipe(gulp.dest("./public"))
});


gulp.task("sass",function(){
   gulp.src("./frontend/assets/sass/**/*.scss")
       .pipe(plumber())
       .pipe(sass())
       .pipe(gulp.dest("./public/css"))
});


gulp.task("watch",function(){
   gulp.watch("./frontend/assets/tmpl/**/*.jade",["jade"]);
   gulp.watch("./frontend/assets/sass/**/*.scss",["sass"]);
});


gulp.task("server",function() {
    browser.init({
        server: {
            baseDir:"./public"
        },
        open: "external"
    });
    gulp.watch([
        "./public/**/*"
    ],function(){
        setTimeout(function(){
            browser.reload();

        },500);
    })
});