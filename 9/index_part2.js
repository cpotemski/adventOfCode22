const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const rope = [];
  const knotCount = 10;
  for(let i = 1; i <= knotCount; i++) {
    rope.push({x:0, y:0});
  }

  const head = rope[0];
  const tail = rope[rope.length - 1];
  let visitedTailPositions = new Set();
  visitedTailPositions.add(`${tail.x}:${tail.y}`);

  const moveRope = () => {
    rope.forEach((knot, index) => {
      if(index === 0) {
        return;
      }
      const previousKnot = rope[index - 1];
      moveKnot(previousKnot, knot);
    })
  }

  const moveKnot = (prev, current) => {
    const diffX = prev.x - current.x;
    const diffY = prev.y - current.y;

    
    let moveUp = false;
    let moveRight = false;
    let moveDown = false;
    let moveLeft = false;

    if(diffX > 1) {
      moveRight = true;
      if(diffY > 0) {
        moveUp = true;
      }
      if(diffY < 0) {
        moveDown = true;
      }
    }
    if(diffX < -1) {
      moveLeft = true;
      if(diffY > 0) {
        moveUp = true;
      }
      if(diffY < 0) {
        moveDown = true;
      }
    }
    if(diffY > 1) {
      moveUp = true;
      if(diffX > 0) {
        moveRight = true;
      }
      if(diffX < 0) {
        moveLeft = true;
      }
    }
    if(diffY < -1) {
      moveDown = true;
      if(diffX > 0) {
        moveRight = true;
      }
      if(diffX < 0) {
        moveLeft = true;
      }
    }

    if(moveUp) {
      current.y++;
    }
    if(moveRight) {
      current.x++;
    }
    if(moveDown) {
      current.y--;
    }
    if(moveLeft) {
      current.x--;
    }
  }

  const steps = data.split('\n')//.slice(0,2);
  steps.forEach(step => {
    const [direction, amountString] = step.split(' ');
    const amount = Number(amountString);

    for(let move = 1; move <= amount; move++) {
      switch(direction) {
        case 'U': head.y++; break;
        case 'R': head.x++; break;
        case 'D': head.y--; break;
        case 'L': head.x--; break;
        default: throw new Error('whoot? ' + direction);
      }
      
      moveRope();
      
      visitedTailPositions.add(`${tail.x}:${tail.y}`);
    }
  })
  printRope();

  console.log(visitedTailPositions.size);
});