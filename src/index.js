const fs = require("fs");
const path = require("path");

const render = require("./render");
const traitsLib = require("./vendor/qql-traits.min.js");
const RENDER_CNT = 200;

async function main(args) {
  const [outdir, target, extraArg] = args;
  if (outdir == null || target == null || extraArg != null) {
    throw new Error("usage: render <outdir> { <seed> | <address> }");
  }

  let i = 0;
  let seedList = []; 
  var timetaken = "Time taken to generate " + RENDER_CNT + " desired seeds";
  console.time(timetaken);
  while (i < RENDER_CNT) {
    const seed = generateSeed(target);
    const traits = traitsLib.extractTraits(seed);
    // comment these out for totally random
    if (!checkTraits(traits)) {
      continue;
    }
    seedList.push(seed);
    i++;
  }
  console.timeEnd(timetaken);
  timetaken = "Time taken to render " + RENDER_CNT + " seeds";
  console.time(timetaken);
  for (let i = 0; i < seedList.length; i++) {
    seed = seedList[i];
    // console.log("Seed:", seed);
    // console.log("Traits:", JSON.stringify(traits, null, 2));
    const { imageData, renderData } = await render({ seed, width: 2400 });
    console.log("Render #", i, ": ", renderData);
    const basename = `${new Date().toISOString()}-${seed}.png`;
    const outfile = path.join(outdir, basename);
    await fs.promises.writeFile(outfile, imageData);
    const info_file = path.join(outdir, basename + ".txt");
    await fs.promises.writeFile(info_file, JSON.stringify(renderData, null, 2));

  }
  console.timeEnd(timetaken);

}

function generateSeed(target) {
  target = target.toLowerCase();
  if (!target.match(/^0x[0-9a-f]*$/)) {
    throw new Error("expected hex string; got: " + target);
  }
  const nibbles = target.slice(2);
  if (nibbles.length === 40) return randomSeed(Buffer.from(nibbles, "hex"));
  if (nibbles.length === 64) return target;
  throw new Error(
    "expected address (bytes20) or seed (bytes32); got: " + target
  );
}

function randomSeed(address) {
  if (!Buffer.isBuffer(address) || address.length !== 20)
    throw new Error("expected address, got: " + address);
  const buf = Buffer.from(
    Array(32)
      .fill()
      .map(() => Math.random() * 256)
  );
  address.copy(buf);
  // Set "version 1" to get proper spirals.
  const version = 1;
  buf[26] = buf[27] = 0xff; // version sentinel
  buf[28] = (buf[28] & 0x0f) | (version << 4);
  return "0x" + buf.toString("hex");
}

function checkTraits(traits) {
  //if ((traits["colorPalette"] != "Fidenza") && (traits["colorPalette"] != "Edinburgh") ) return false;
  if ((traits["colorPalette"] != "Fidenza") && (traits["colorPalette"] != "Edinburgh") ) return false;
  //if (traits["colorMode"] != "Stacked") return false;
  if (traits["colorMode"] != "Simple") return false;

  if (traits["colorVariety"] != "Medium") return false;
 //if (traits["colorVariety"] != "Low") return false;
 //if (traits["colorVariety"] != "High") return false;

  if (traits["flowField"] != "Random Radial") return false;
  //if (traits["flowField"] != "Random Linear") return false;


  if (traits["spacing"] != "Dense") return false;
  //if (traits["structure"] != "Orbital") return false;
  //if (traits["structure"] != "Formation") return false;

  //if (traits["sizeVariety"] != "Constant") return false;
  if (traits["sizeVariety"] != "Wild") return false;
  //if (traits["ringSize"] != "Small") return false;
  if (traits["ringSize"] != "Large") return false;

  // if (traits["turbulence"] != "None") return false;
  if (traits["turbulence"] != "High") return false;

  //if (traits["ringThickness"] != "Mixed") return false;
  if (traits["ringThickness"] != "Thick") return false;
  //if (traits["ringThickness"] != "Thin") return false;
  if (traits["margin"] != "Crisp") return false;

  return true;
}

main(process.argv.slice(2)).catch((e) => {
  process.exitCode = process.exitCode || 1;
  console.error(e);
});
