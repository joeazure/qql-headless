const traitsLib = require("./vendor/qql-traits.min.js");

async function main(args) {
    const [seed] = args;
    if (seed == null ) {
      throw new Error("usage: traits_from_seed.js <filenseedame> ");
    }
    
    const traits = traitsLib.extractTraits(seed);
    console.log(seed);
    console.log("Traits:", JSON.stringify(traits, null, 2));
    return traits;
  }
  
  main(process.argv.slice(2)).catch((e) => {
    process.exitCode = process.exitCode || 1;
    console.error(e);
  });
  