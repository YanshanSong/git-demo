'use strict';

/**
  * 1. LESS编译 压缩 合并
  * 2. JS合并 压缩 混淆
  * 3. img复制
  * 4. html压缩
  */

// 在gulpfile 中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');           // less --> css
var cssnano = require('gulp-cssnano');     // css压缩 
var concat = require('gulp-concat');       // js合并
var uglify = require('gulp-uglify');       // js压缩
var htmlmin = require('gulp-htmlmin');     // html压缩
var browserSync = require('browser-sync'); // 提供服务器

// 1.LESS编译 压缩 合并
gulp.task('style',function(){
	//这里是在执行style任务时自动执行
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])  //选取所有的less文件
	.pipe(less())        //less文件编译为css文件
	.pipe(cssnano())     //css文件压缩
	.pipe(gulp.dest('dist/styles/'))  //移动
	.pipe(browserSync.reload({
      stream: true
    }));
});

// 2.JS 合并 压缩 混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')  //选取所有的js文件
	.pipe(concat('all.js'))       //将所有的js文件合并成一个文件"all.js"
	.pipe(uglify())               //js文件压缩
	.pipe(gulp.dest('dist/scripts/'))  //移动
	.pipe(browserSync.reload({
      stream: true
    }));
});

// 3.图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

// 4.HTML
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))   //html文件压缩
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('serve',function(){
	browserSync({
		server : {
			baseDir : ['dist']
		}
	},function(err,bs){
		console.log(bs.options.getIn(["urls","local"]));
	});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/index.html',['html']);
});
