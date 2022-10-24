const utils = require("./utils");

const db = require("./models");

async function ingest_seed(hexseed) {
  // Inserts a single hexseed into the seed_db
  if (!utils.is_valid_full_seed(hexseed)) {
    throw new Error("Invalid full seed. Expected eth address + bytes(12)");
  }
  // split the seed
  var { eth_hex, qql_hex } = utils.split_hexseed(hexseed);
  // check for existing seed
  var s = await db.seed.findOne({
    where: {
      full_hexseed: hexseed
    }
  });
  if (s !== null) {
    console.log('Hexseed already exists: '+hexseed);
    return;
  }

  // check for existing wallet
  var owner_wallet = await db.wallet.findOne({
      where: {
        address: eth_hex
    }
  });
  if (owner_wallet === null) {
    // Create a new Wallet
    owner_wallet = await db.wallet.create({
      address: eth_hex
    });
    console.log("New wallet created");
  }
  
    // Now insert the seed and traits is a transaction
    //console.log('Inserting algorithm seed: ' + qql_hex);
    var new_seed = await db.seed.create({
      full_hexseed: hexseed,
      algorithm_hexseed: qql_hex,
      wallet_id: owner_wallet.id
    });
    var traits = utils.traits_from_seed(hexseed);
    var new_trait = await db.trait.create({
      seed_id: new_seed.id,
      version: traits["version"],
      flowField: traits["flowField"],
      turbulence: traits["turbulence"],
      margin: traits["margin"],
      colorVariety: traits["colorVariety"],
      colorMode: traits["colorMode"],
      structure: traits["structure"],
      bullseyeRings1: traits["bullseyeRings1"],
      bullseyeRings3: traits["bullseyeRings3"],
      bullseyeRings7: traits["bullseyeRings7"],
      ringThickness: traits["ringThickness"],
      ringSize: traits["ringSize"],
      sizeVariety: traits["sizeVariety"],
      colorPalette: traits["colorPalette"],
      spacing: traits["spacing"]
    });  
}

function ingest_seed_list(seed_list) {
  for (var i = 0; i < seed_list.length; i++) {
    ingest_seed(seed_list[i]);
  }
}

exports.ingest_seed = ingest_seed;
exports.ingest_seed_list = ingest_seed_list;

  