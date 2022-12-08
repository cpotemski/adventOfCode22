const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const elves = data.split("\n\n");

  const elveSum = elves.map((elve) =>
    elve.split("\n").map((a) => parseInt(a)).reduce((a,b) => a + b, 0)
  );

  const top3 = elveSum.sort((a, b) => b-a).splice(0, 3);

  console.log(top3.reduce((a,b) => a+b, 0));

  // console.log(Math.max(...elveSum));
});
