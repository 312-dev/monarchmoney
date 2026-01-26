#!/usr/bin/env node

/**
 * Version Sync Script for Eclosion
 *
 * This script synchronizes the documentation version with the Python package version.
 * It reads the version from monarchmoney/__init__.py and updates:
 * - docs/package.json
 * - docs/docusaurus.config.js (via runtime)
 */

const fs = require('fs');
const path = require('path');

const INIT_FILE = path.join(__dirname, '..', '..', 'monarchmoney', '__init__.py');
const PACKAGE_JSON = path.join(__dirname, '..', 'package.json');

function getVersionFromPython() {
  try {
    const content = fs.readFileSync(INIT_FILE, 'utf8');
    const match = content.match(/__version__\s*=\s*["']([^"']+)["']/);
    if (match) {
      return match[1];
    }
    throw new Error('Version not found in __init__.py');
  } catch (error) {
    console.error('Error reading Python version:', error.message);
    return '0.0.0';
  }
}

function updatePackageJson(version) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
    const oldVersion = packageJson.version;

    if (oldVersion === version) {
      console.log(`Version already synchronized: ${version}`);
      return;
    }

    packageJson.version = version;
    fs.writeFileSync(PACKAGE_JSON, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`Updated package.json version: ${oldVersion} -> ${version}`);
  } catch (error) {
    console.error('Error updating package.json:', error.message);
  }
}

function main() {
  console.log('Synchronizing documentation version with Python package...');

  const version = getVersionFromPython();
  console.log(`Python package version: ${version}`);

  updatePackageJson(version);

  console.log('Version sync complete!');
}

main();
