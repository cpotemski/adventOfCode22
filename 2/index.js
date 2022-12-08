const { arraySum } = require('../utils');
const fs = require("fs");

const WIN_DRAW_LOSE = {
  'A X': 3,
  'A Y': 6,
  'A Z': 0,
  'B X': 0,
  'B Y': 3,
  'B Z': 6,
  'C X': 6,
  'C Y': 0,
  'C Z': 3,
}

const POINTS = {
  'X': 1,
  'Y': 2,
  'Z': 3
}

const PART2_TYPE_POINTS = {
  'A X': 3,
  'A Y': 1,
  'A Z': 2,
  'B X': 1,
  'B Y': 2,
  'B Z': 3,
  'C X': 2,
  'C Y': 3,
  'C Z': 1,
}

const PART2_POINTS = {
  'X': 0,
  'Y': 3,
  'Z': 6
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const rounds = data.split("\n");

  const pointsPerRound = rounds.map(round => {
    const [_, own] = round.split(' ');
    
    return WIN_DRAW_LOSE[round] + POINTS[own];
  })

  console.log(arraySum(pointsPerRound));

  // part2

  const pointsPerRound2 = rounds.map(round => {
    const [_, own] = round.split(' ');
    
    return PART2_TYPE_POINTS[round] + PART2_POINTS[own];
  })

  console.log(arraySum(pointsPerRound2));

});
