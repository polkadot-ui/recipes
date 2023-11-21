/* @license Copyright 2023 @polkadot-cloud/recipes authors & contributors
SPDX-License-Identifier: GPL-3.0-only */
/* eslint-disable @typescript-eslint/no-var-requires */

import pkg from "gulp";
const { src, dest, series } = pkg;
import ts from "gulp-typescript";
import strip from "gulp-strip-comments";
import sourcemaps from "gulp-sourcemaps";
import merge from "merge-stream";
import refresh from "gulp-livereload";
import lrserver from "tiny-lr";

import gulpSass from "gulp-sass";
import * as sass from "sass";

const sass_f = gulpSass(sass);

const SASS_OPTIONS = { outputStyle: "compressed" };

const buildComponents = () => {
  var tsProject = ts.createProject("tsconfig.json");
  var tsResult = tsProject.src().pipe(sourcemaps.init()).pipe(tsProject());

  return merge(tsResult, tsResult.js)
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"));
};

const buildCss = () => {
  return src("lib/**/*.scss")
    .pipe(sass_f(SASS_OPTIONS))
    .pipe(dest("dist"))
    .pipe(refresh(lrserver()));
};

const stripComments = () => {
  return src("dist/**/*.js").pipe(strip()).pipe(dest("dist"));
};

const licenseAndReadme = () => {
  return src(["LICENSE", "README.npm.md"]).pipe(dest("dist"));
};

export default series(
  buildCss,
  buildComponents,
  stripComments,
  licenseAndReadme
);
