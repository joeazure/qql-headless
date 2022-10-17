function seed_from_filename(filename) {
  var seed = filename.substr(filename.lastIndexOf('-')+1) || filename;
  seed = seed.substr(0, seed.lastIndexOf('.')) || seed;
  return seed;
}


exports.seed_from_filename = seed_from_filename;
