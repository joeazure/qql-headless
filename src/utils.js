// Utility functions for qql-headless
const fs = require("fs");
const traitsLib = require("./vendor/qql-traits.min.js");

function is_qql_output_filename(fname) {
  // Look for .png extension and existence og '-0x'
  const f = fname.toLowerCase();
  return (f.includes("-0x")) && (f.toLowerCase().endsWith(".png"));
}

function seedlist_from_dir(dir_name) {
  const ret = []; 
  var files = fs.readdirSync(dir_name);
  files.forEach(function (file) {
    if (is_qql_output_filename(file) == true) {
      ret.push(seed_from_filename(file));
    } 
  });
  return ret;
}

function seed_from_filename(filename) {
  if (!is_qql_output_filename(filename)) {
    throw new Error("expected valid QQL output filename. got: " + filename);
  }
  var seed = filename.substr(filename.lastIndexOf('-')+1) || filename;
  seed = seed.substr(0, seed.lastIndexOf('.')) || seed;
  return seed;
}

function is_valid_full_seed(seed) {
  if (!seed.match(/^0x[0-9a-f]*$/)) {
    return false;
  }
  if (seed.length != 66) {
    return false;
  }
  return true;
}

function split_hexseed(seed) {
  // Assumes hexstring is like: 0x + 32 byte hex (64 chrs)
  // 0x37b15e06ad0f4520ccdd8c2557d2a28da0354f7d06e4b13c1f35ffff10a99eb7
  if (!seed.match(/^0x[0-9a-f]*$/)) {
    throw new Error("expected hex string; got: " + seed);
  }
  var nibbles = seed.slice(2);
  if (nibbles.length != 64) {
    throw new Error("expected eth address + bytes(12)")
  }
  var eth_hex = seed.substr(0, 41);
  var qql_hex = seed.substr(42);
  return { eth_hex, qql_hex };
}

function traits_from_seed(hexseed) {
  var traits = traitsLib.extractTraits(hexseed);
  return traits;
}

exports.seed_from_filename = seed_from_filename;
exports.split_hexseed = split_hexseed;
exports.is_qql_output_filename = is_qql_output_filename;
exports.seedlist_from_dir = seedlist_from_dir;
exports.is_valid_full_seed = is_valid_full_seed;
exports.traits_from_seed = traits_from_seed;
