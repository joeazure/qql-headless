const utils = require("./utils");

async function main(args) {
  const [filename] = args;
  if (filename == null ) {
    throw new Error("usage: see_from_file.js <filename> ");
  }
  
  const seed = utils.seed_from_filename(filename);
  console.log(seed);
  const { eth_hex, qql_hex } = utils.split_hexseed(seed);
  console.log("Address: ", eth_hex, " Seed: ", qql_hex);
  return seed;
}

main(process.argv.slice(2)).catch((e) => {
  process.exitCode = process.exitCode || 1;
  console.error(e);
});