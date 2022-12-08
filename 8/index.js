const { arraySum } = require("../utils");
const fs = require("fs");

const isBiggest = (height, trees) => {
  return trees.every(tree => height > tree);
}

const VISIBLE = 1;
const INVISIBLE = 0;

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const visibleTreesGrid = [];
  const heightGrid = data.split('\n').map(line => line.split('').map(height => Number(height)));
  const gridHeight = heightGrid.length;
  const gridWidth = heightGrid[0].length;

  const visibleFromTop = (treeHeight, x, y) => {
    if(y === 0) {
      return true;
    }
    const treesAbove = heightGrid.filter((line, yIndex) => yIndex < y).map(line => line.find((tree, xIndex) => xIndex === x));
    // console.log(treesAbove);
    return isBiggest(treeHeight, treesAbove)
  }

  const visibleFromRight = (treeHeight, x, y) => {
    if(x === gridWidth - 1) {
      return true;
    }
    const treesToTheRight = heightGrid.find((line, yIndex) => yIndex === y).slice((gridWidth - x - 1) * -1)
    return isBiggest(treeHeight, treesToTheRight)
  }

  const visibleFromBottom = (treeHeight, x, y) => {
    if(y === gridHeight - 1) {
      return true;
    }
    const treesBelow = heightGrid.filter((line, yIndex) => yIndex > y).map(line => line.find((tree, xIndex) => xIndex === x));
    return isBiggest(treeHeight, treesBelow)
  }
  
  heightGrid.forEach((line, y) => {
    visibleTreesGrid.push([]);
    line.forEach((tree, x) => {
      let visible = true;
      if(x > 0) {
        visible = isBiggest(tree, line.slice(0, x));
      }
      visibleTreesGrid[y][x] = visible ? VISIBLE : INVISIBLE;
    })
  })

  visibleTreesGrid.forEach((line, y) => {
    line.forEach((tree, x) => {
      if(tree === VISIBLE) {
        return;
      }

      const visible = visibleFromTop(heightGrid[y][x], x, y) || visibleFromRight(heightGrid[y][x], x, y) || visibleFromBottom(heightGrid[y][x], x, y);

      visibleTreesGrid[y][x] = visible ? VISIBLE : INVISIBLE;
    })
  })

  console.log(visibleTreesGrid.map(line => line.join('')).join('\n'));

  console.log(arraySum(visibleTreesGrid.map(line => arraySum(line))))
});