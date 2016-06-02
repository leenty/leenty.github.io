var gulp = require('gulp');
var shell = require('gulp-shell');
// var liveReload = require('gulp-livereload');
var notify = require('gulp-notify');


gulp.task("default",function(){
  gulp.src("./public/index.html")
    .pipe(shell([
      'hexo g'
    ]))
    .pipe(notify('hexo编译完成！'))
    // .pipe(liveReload())
});

// gulp.task('default', shell.task([
//   'hexo generate'
// ]));

gulp.task('server',shell.task([
  'hexo server -i localhost'
]));

gulp.task('hw',shell.task([
  'hexo g --watch'
]));

gulp.task('watch',function(){
  // liveReload.listen();
  gulp.start('server');
  gulp.start('hw');
  // gulp.watch(["./source/*/*md","./_config.yml","./themes/yilia/_config.yml"],['default']);
})