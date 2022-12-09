const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let headX = 0;
  let headY = 0;
  let tailX = 0;
  let tailY = 0;
  let visitedTailPositions = new Set();
  visitedTailPositions.add(`${tailX}:${tailY}`);

  const moveTail = () => {
    const diffX = headX - tailX;
    const diffY = headY - tailY;

    if(diffX > 1) {
      tailY = headY;
      tailX = headX - 1;
    } else if(diffX < -1) {
      tailY = headY;
      tailX = headX + 1;
    } else if(diffY > 1) {
      tailX = headX;
      tailY = headY - 1;
    } else if(diffY < -1) {
      tailX = headX;
      tailY = headY + 1;
    }
  }

  // console.log(`S - ${headX}:${headY} - ${tailX}:${tailY}`)

  const steps = data.split('\n')//.slice(0,4);
  steps.forEach(step => {
    const [direction, amountString] = step.split(' ');
    const amount = Number(amountString);

    for(let move = 1; move <= amount; move++) {
      switch(direction) {
        case 'U': headY++; break;
        case 'R': headX++; break;
        case 'D': headY--; break;
        case 'L': headX--; break;
        default: throw new Error('whoot? ' + direction);
      }
      
      moveTail();
      
      // console.log(`${direction} - ${headX}:${headY} - ${tailX}:${tailY}`)

      visitedTailPositions.add(`${tailX}:${tailY}`);
    }
  })

  console.log(visitedTailPositions.size);
});