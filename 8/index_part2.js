const fs = require("fs");

const howManyTreesCanBeSeen = (height, trees) => {
  let result = 1;
  for(let i = 1; i <= trees.length; i++) {
    result = i;
    if(trees[i - 1] >= height) {
      break;
    }
  }
  return result
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const heightGrid = data.split('\n').map(line => line.split('').map(height => Number(height)));
  const gridHeight = heightGrid.length;
  const gridWidth = heightGrid[0].length;
  let maxScore = 0;

  
  heightGrid.forEach((line, y) => {
    line.forEach((tree, x) => {
      const treesAbove = heightGrid.filter((line, yIndex) => yIndex < y).map(line => line.find((tree, xIndex) => xIndex === x)).reverse();
      const treesToTheRight = heightGrid.find((line, yIndex) => yIndex === y).slice((gridWidth - x - 1) * -1)
      const treesBelow = heightGrid.filter((line, yIndex) => yIndex > y).map(line => line.find((tree, xIndex) => xIndex === x));
      const treesToTheLeft = heightGrid.find((line, yIndex) => yIndex === y).slice(0, x).reverse();

      const score = howManyTreesCanBeSeen(tree, treesAbove) * howManyTreesCanBeSeen(tree, treesToTheRight) * howManyTreesCanBeSeen(tree, treesBelow) * howManyTreesCanBeSeen(tree, treesToTheLeft);

      if(score > maxScore) {
        console.log('new highscore', score);
        maxScore = score;
      }
    })
  })

  console.log(maxScore)

});