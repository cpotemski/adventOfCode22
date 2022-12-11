const { arraySum } = require("../utils");
const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const commands = data.split("\n");

  let commandCounter = 0;
  let X = 1;

  const CYCLE_COUNT = 230;

  let sum = 0;

  const queue = [];
  let image = '';
  let i = 0;

  while(commandCounter <= commands.length - 1) {
    i++;
    // console.log('---- cycle', i);

    if (queue.length === 0) {
      const [command, valueString] = commands[commandCounter].split(" ");
      commandCounter++;
      let value;
      
      if (valueString) {
        value = Number(valueString);
      }

      let cycleLength = 0;
      switch(command) {
        case 'noop': cycleLength = 1; break;
        case 'addx': cycleLength = 2; break;
        default: throw new Error('whoot?');
      }

      const newTask = { task: command, cycle: i + cycleLength - 1, value };
      // console.log('new task', newTask);

      queue.push(newTask);
    }

    let task = queue.find((t) => t.cycle === i);

    if (i % 40 === 20) {
      sum += i * X;
      // console.log(`-- Cycle ${i}: X=${X} --`);
    }

    let crt_position = i % 40 - 1;

    if(crt_position === 0) {
      image += '\n';
    }

    console.log(`CRT ${crt_position} - SPRITE ${X-1}-${X+1}`)

    if(crt_position >= X-1 && crt_position <= X+1) {
      image += '#';
    } else {
      image += ' ';
    }

    if(task) {
      if (task.task !== "noop") {
        X += task.value;
      }

      queue.pop();

      // console.log(`${task.task} finished`);
    }
  }
  console.log(commandCounter);

  console.log(image);
});
