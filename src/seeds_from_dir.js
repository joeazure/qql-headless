const utils = require("./utils");

async function main(args) {
  const [dir_name] = args;
  if (dir_name == null ) {
    throw new Error("usage: seeds_from_dir.js <dir_name> ");
  }
 
  const seed_list = await utils.seedlist_from_dir(dir_name);
  for (var i = 0; i < seed_list.length; i++) {
    console.log(utils.split_hexseed(seed_list[i]));   
  }
}

main(process.argv.slice(2)).catch((e) => {
  process.exitCode = process.exitCode || 1;
  console.error(e);
});