import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
const project = ts.createProject('tsconfig.json')


gulp.task('compile', () => {
  return new Promise<void>((resolve,_) => {
    gulp
      .src(['src/**/*.ts', 'src/**/*.js'], { base: 'src/' })
      .pipe(project())
      .pipe(gulp.dest('dist/'));
    resolve();
  });
})

gulp.task('copy', async () => {
  return new Promise<void>((resolve,_) => {
    gulp.src('README.md').pipe(gulp.dest("dist/"))
    gulp.src("src/module.json").pipe(gulp.dest('dist/'))
    gulp.src("src/lang/**").pipe(gulp.dest('dist/lang/'))
    gulp.src("src/templates/**").pipe(gulp.dest('dist/templates/'))
    gulp.src("src/styles/**").pipe(gulp.dest('dist/styles/'))
    gulp.src("src/assets/**").pipe(gulp.dest('dist/assets/'))
    resolve();
  })
})

gulp.task('build', gulp.parallel('compile', 'copy'));

gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', gulp.parallel('compile'));
  gulp.watch('src/lang/**', gulp.series('copy'));
  gulp.watch('src/template/**', gulp.series('copy'));
  gulp.watch('src/styles/**', gulp.series('copy'));
});

/*
// This is supposed to copy the dist folder into the modules directory for testing. Only works if you've set it up the right way
//This works if development path is FoundryVTT/Data/dev/modules/swade-item-macros
const MODULEPATH = "../../../modules/swade-item-macros/"

gulp.task('foundry', () => {
  return gulp.src('dist/**').pipe(gulp.dest(MODULEPATH))
})

gulp.task("update", gulp.series('build', 'foundry'))
*/
