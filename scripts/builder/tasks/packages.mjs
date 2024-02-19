// Copyright 2023 @polkadot-cloud/recipes authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import {
  addTypescriptPropertiesIfMain,
  allPropertiesExist,
  checkFilesExistInPackages,
  checkFoldersInDirectory,
  ensurePackageOutputExists,
  formatJson,
  formatNpmPackageName,
  getDistPackageJson,
  getPackageScripts,
  getPackages,
  getPackagesDirectory,
  getSourcePackageJson,
  writePackageJsonToOutput,
} from "../utils.mjs";
import {
  PACKAGE_REQUIRED_FILES,
  PACKAGE_REQUIRED_JSON_KEYS,
  PACKAGE_REQUIRED_SCRIPTS,
} from "../config.mjs";

export const prebuild = async () => {
  try {
    // Get the list of package directories.
    // ------------------------------------
    const packages = await getPackages();

    // Ensure all package directories exist.
    // -------------------------------------
    if (!(await checkFoldersInDirectory(getPackagesDirectory(), packages))) {
      throw `❌ Package directories missing. Must have ${packages.join(
        ", ",
      )} directories`;
    }

    // Check required files exist for each package.
    if (!(await checkFilesExistInPackages(packages, PACKAGE_REQUIRED_FILES))) {
      throw `❌ Required files missing in packages. Must have ${PACKAGE_REQUIRED_FILES.join(
        ", ",
      )} files`;
    }

    // Check all required properties exist for each package.
    // -----------------------------------------------------
    for (const pkg of packages) {
      if (
        !allPropertiesExist(
          await getPackageScripts(pkg),
          PACKAGE_REQUIRED_SCRIPTS,
        )
      ) {
        throw `❌ Missing script field(s) in package.json. Must have ${PACKAGE_REQUIRED_SCRIPTS.join(
          ", ",
        )} properties`;
      }
    }
    console.log("✅ Pre-build packages integrity checks succeeded.");
  } catch (err) {
    console.error(err);
  }
};

export const build = async ({ p: packageName, m: main }) => {
  try {
    // A package name must be provided.
    // --------------------------------
    if (!packageName) {
      throw "❌ Please provide package name with the -p argument";
    }

    // Full package directory path.
    // ----------------------------
    const packagePath = "."; //join(getPackagesDirectory(), packageName);

    // Source package.json as a parsed JSON object.
    // ----------------------------------------------
    const sourcePackageJson = await getSourcePackageJson(packagePath);

    // Required properties to be copied to the npm build package.json file.
    // --------------------------------------------------------------------
    const requiredProperties = Object.entries(sourcePackageJson).filter((k) =>
      PACKAGE_REQUIRED_JSON_KEYS.includes(k[0]),
    );

    //Inject formatted package `name` into required properties.
    // --------------------------------------------------------
    requiredProperties.unshift(["name", formatNpmPackageName(packageName)]);

    // Format package.json as Typeacript module if `main` was provided.
    // ----------------------------------------------------------------
    let finalProperties = Object.fromEntries(requiredProperties);
    finalProperties = addTypescriptPropertiesIfMain(main, finalProperties);

    // Format final package.json for output.
    // -------------------------------------
    const packageJson = await formatJson(finalProperties);

    // Create output directory if it does not exist.
    // --------------------------------------------
    await ensurePackageOutputExists(packagePath);

    // Write package.json to the output directory.
    // -------------------------------------------
    await writePackageJsonToOutput(packagePath, packageJson);

    console.log(`✅ package.json injected into package ${packageName}.`);
  } catch (err) {
    console.error(`❌ Could not generate  ${packageName} package.json:`, err);
  }
};

export const postbuild = async () => {
  try {
    const packages = await getPackages();

    for (let pkg of packages) {
      // Read and parse package.json file.
      // ---------------------------------
      const packageJson = await getDistPackageJson(pkg);

      // Ensure package name is correct.
      // -------------------------------
      if (packageJson?.name !== formatNpmPackageName(pkg)) {
        throw `❌ package.json name field does not match the naming requirement.`;
      }
    }

    console.log("✅ Post-build integrity checks complete.");
  } catch (err) {
    console.error("❌ Could not complete integrity checks.", err);
  }
};
