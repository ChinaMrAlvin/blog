//����gulpģ�鼰������Ĳ��
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync');

//js �ļ�ѹ���ϲ�
gulp.task('scripts',function(){
    return gulp.src(['./js/index.js','./js/init.js'])
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
})

//css �ļ� ѹ���ϲ�
gulp.task('styles',function(){
    return gulp.src(['./less/*.css'])
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
})

//html�ļ�ѹ��
gulp.task('html',function(){
    return gulp.src(['./*.html'])
    .pipe(htmlmin({
         collapseWhitespace:true,//ѹ��HTML
        removeComments:true,//���HTMLע��
        minfyJS:true,//ѹ��htmlҳ��JS
        minfyCSS:true,//ѹ��htmlҳ��CSS
        removeStyleLinkTypeAttrubutes:true,//ɾ��style
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