var gulp = require('gulp'),
 sass = require('gulp-sass'),
 browserSync = require('browser-sync'),
 concat = require('gulp-concat'),
 uglify = require('gulp-uglifyjs'),
 cssnano = require('gulp-cssnano'),
 rename = require('gulp-rename'),
 del = require('del'),
 imagemin = require('gulp-imagemin'),
 pngquant = require('gulp-pngquant'),
 cache = require('gulp-cache'),
 autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
 return gulp.src('app/sass/**/*.sass')
 .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
 .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']), {cascade: true})
 .pipe(gulp.dest('app/css'))
 .pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function(){
 return gulp.src('app/img/**/*')
 .pipe(cache(imagemin({
  interlaced: true,
  progressive: true,
  svgoPlugins: [{removeViewBox: false}],
  use: [pngquant()]
 })))
 .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function(){
 return del.sync('dist')
});

gulp.task('css-libs', ['sass'], function(){
 return gulp.src('app/css/libs.css')
 .pipe(cssnano())
 .pipe(rename({suffix: '.min'}))
 .pipe(gulp.dest('app/css'))
});

gulp.task('script', function(){
 return gulp.src(['app/libs/jquery/dist/jquery.min.js',
  'app/libs/slick-carousel/slick/slick.min.js',
  'app/libs/jquery-validation/dist/jquery.validate.min.js'])
         .pipe(concat('libs.min.js'))
         .pipe(uglify())
         .pipe(gulp.dest('app/js'))
});

gulp.task('browser-sync', function(){
 browserSync({
  server: {
   baseDir: 'app'
  },
  notify: false
 });
});

gulp.task('build', ['clean', 'img', 'sass', 'script'], function(){
 var buildCss = gulp.src(['app/css/**/*.css', '!app/css/libs.css' ])
     .pipe(gulp.dest('dist/css'))

 var buildFonts = gulp.src('app/fonts/**/*')
     .pipe(gulp.dest('dist/fonts'))

 var buildHtml = gulp.src('app/*.html')
     .pipe(gulp.dest('dist'))

 var buildJs = gulp.src('app/js/**/*.js')
     .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['browser-sync', 'script', 'css-libs'] , function(){
 gulp.watch('app/sass/**/*.sass', ['sass']);
 gulp.watch('app/*.html', browserSync.reload);
 gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);