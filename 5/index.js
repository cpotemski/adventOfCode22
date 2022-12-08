const { arraySum } = require("../utils");
const fs = require("fs");

const crates = [];

fs.readFile("./crates.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const splitLines = lines.map((line) => line.match(/.{1,4}/g));
  splitLines.pop();

  splitLines
    .slice()
    .reverse()
    .forEach((line) => {
      line.forEach((element, index) => {
        const char = element.replace("[", "").replace("]", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
        if (char) {
          if (!crates[index]) {
            crates[index] = [];
          }
          crates[index].push(char);
        }
      });
    });

  console.log(crates);
});


fs.readFile("./moves.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const moves = data.split("\n");
  moves.forEach(move => {
    const cleanedMove = move.replace('move ', '').replace(' from ', ',').replace(' to ', ',');
    const [amount, from, to] = cleanedMove.split(',');
    for(let i = amount; i > 0; i--) {
      const movedCrate = crates[from - 1].pop();
      crates[to - 1].push(movedCrate);
    }
  })

  // console.log(crates);
  console.log(crates.map(crate => crate.pop()).join(''))

})