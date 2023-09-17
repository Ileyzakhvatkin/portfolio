const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const htmlMin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

// Dev server - start
const cleanDev = () => {
  return del('dev')
};
const resoursesDev = () =>  {
  return src('src/resourses/**')
    .pipe(dest('dev/resourses'))
};
const fontDev = () =>  {
  return src('src/fonts/**')
    .pipe(dest('dev/fonts'))
};
const sassDev = () => {
  return src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    // .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/css'))
    .pipe(sourcemaps.write())
    .pipe(browserSync.stream())
}
const pugDev = () => {
  return src('src/**/*.pug')
    .pipe(pug())
    // .pipe(htmlMin({
    //   collapseWhitespace: true,
    // }))
    .pipe(dest('dev'))
    .pipe(browserSync.stream())
};
const svgSpritesDev = () => {
  return src('src/images/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        },
        symbol: true
      }
    }))
    .pipe(dest('dev'))
};
const imagesDev = () => {
  return src([
      'src/images/**/*.jpg',
      'src/images/**/*.png',
      'src/images/*.svg',
      'src/images/**/*.jpeg',
      'src/images/**/*.webp',
    ])
    .pipe(image())
    .pipe(dest('dev/images'))
};
const scriptsDev = () => {
  return src([
      'src/js/components/**/*.js',
      'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    .pipe(concat('js/main.js'))
    // .pipe(uglify({
    //   toplevel: true
    // }).on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest('dev'))
    .pipe(browserSync.stream())
};
const watchFilesDev = () => {
  browserSync.init({
    server: {
      baseDir: 'dev'
    }
  })
};
watch('src/resourses/**', resoursesDev);
watch('src/fonts/**', fontDev);
watch('src/**/*.pug', pugDev);
watch('src/styles/**/*.scss', sassDev);
watch('src/images/svg/**/*.svg', svgSpritesDev);
watch('src/js/**/*.js', scriptsDev);
exports.cleandev = cleanDev;
exports.pugdev = pugDev;
exports.sassdev = sassDev;
exports.scriptsdev = scriptsDev;
exports.dev = series(cleanDev, resoursesDev, fontDev, pugDev, sassDev, imagesDev, svgSpritesDev, scriptsDev, watchFilesDev);
// Dev server - end

// Build server - start
const cleanBuild = () => {
  return del('dist')
};
const resoursesDist = () =>  {
  return src('src/resourses/**')
    .pipe(dest('dist/resourses'))
};
const fontBuild = () =>  {
  return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
};
const sassBuild = () => {
  return src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.init())
    // .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    // .pipe(sourcemaps.write())
    .pipe(browserSync.stream())
}
const pugBuild = () => {
  return src('src/**/*.pug')
    .pipe(pug())
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};
const svgSpritesBuild = () => {
  return src('src/images/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        },
        symbol: true
      }
    }))
    .pipe(dest('dist'))
};
const imagesBuild = () => {
  return src([
      'src/images/**/*.jpg',
      'src/images/**/*.png',
      'src/images/*.svg',
      'src/images/**/*.jpeg',
      'src/images/**/*.webp',
    ])
    .pipe(image())
    .pipe(dest('dist/images'))
};
const scriptsBuild = () => {
  return src([
      'src/js/components/**/*.js',
      'src/js/main.js'
    ])
    // .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('js/main.js'))
    .pipe(uglify({
      // toplevel: true
    }).on('error', notify.onError()))
    // .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};
const watchFilesBuild = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
};
watch('src/resourses/**', resoursesDist);
watch('src/fonts/**', fontBuild);
watch('src/**/*.pug', pugBuild);
watch('src/styles/**/*.scss', sassBuild);
watch('src/images/svg/**/*.svg', svgSpritesBuild);
watch('src/js/**/*.js', scriptsBuild);
exports.cleanbuild = cleanBuild;
exports.pugbuild = pugBuild;
exports.sassbuild = sassBuild;
exports.scriptsbuild = scriptsBuild;
exports.default = series(cleanBuild, resoursesDist, fontBuild, pugBuild, sassBuild, imagesBuild, svgSpritesBuild, scriptsBuild, watchFilesBuild);
// Dev server - end

