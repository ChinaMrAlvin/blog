//引入gulp模块及所需核心插件
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync');

//js 文件压缩合并
gulp.task('scripts',function(){
    return gulp.src(['./js/index.js','./js/init.js'])
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
})

//css 文件 压缩合并
gulp.task('styles',function(){
    return gulp.src(['./less/*.css'])
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
})

//html文件压缩
gulp.task('html',function(){
    return gulp.src(['./*.html'])
    .pipe(htmlmin({
         collapseWhitespace:true,//压缩HTML
        removeComments:true,//清除HTML注释
        minfyJS:true,//压缩html页面JS
        minfyCSS:true,//压缩html页面CSS
        removeStyleLinkTypeAttrubutes:true,//删除style
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
})

gulp.task('serve',['styles','scripts'],function(){
    browserSync.init({
        server:'./'
    })
    gulp.watch('./less/*.css',['styles']);
    gulp.watch('./*.html',['html']);
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./js/*.js',['scripts']);
})
gulp.task('default',['serve']);