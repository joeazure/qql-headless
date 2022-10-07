const fs = require("fs");
const path = require("path");

const render = require("./render");
const traitsLib = require("./vendor/qql-traits.min.js");

async function main(args) {
  const [outdir, seed] = args;
  if (outdir == null || seed == null) {
    throw new Error("usage: render <outdir> <seed>");
  }

  const { imageData, renderData } = await render({ seed, width: 2400 });
  const basename = `${new Date().toISOString()}-${seed}.png`;
  const outfile = path.join(outdir, basename);
  await fs.promises.writeFile(outfile, imageData);

  const traits = traitsLib.extractTraits(seed);

  console.log("Seed:", seed);
  console.log("Traits:", JSON.stringify(traits, null, 2));
  console.log("Render data:", JSON.stringify(renderData, null, 2));
  console.log("Image:", outfile);
}

main(process.argv.slice(2)).catch((e) => {
  process.exitCode = process.exitCode || 1;
  console.error(e);
});
