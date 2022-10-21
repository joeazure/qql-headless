const utils = require("./utils");

const db = require("../../models");
const SeedDB = db.seed_db;

function ingest_seed(hexseed) {
  // Inserts a single hexseed into the seed_db
  if (!utils.is_valid_full_seed) {
    throw new Error("Invalid full seed. Expected eth address + bytes(12)");
  }
  // split the seed
  const { eth_hex, qql_hex } = utils.split_hexseed(seed);

  // check for existing wallet
  const users = await User.findAll();
}

  