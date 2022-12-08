const { arraySum } = require("../utils");
const fs = require("fs");

const getPriorityByChar = (char) => {
  const charCode = char.charCodeAt(0);

  // 65 - 90 => A-Z
  if (charCode < 97) {
    return charCode - 38;
  }

  // 97 - 122 => a-z
  return charCode - 96;
};

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const commonChars = lines.map((rucksack) => {
    const mid = rucksack.length / 2;
    const comp1 = rucksack.slice(0, mid);
    const comp2 = rucksack.slice(mid);

    return comp1.split("").find((char) => comp2.includes(char));
  });

  const priorities = commonChars.map(getPriorityByChar);

  console.log(arraySum(priorities));

  // part 2

  const elvenGroups = {};

  lines.forEach((elve, index) => {
    const groupNumber = Math.floor(index / 3);
    if (!elvenGroups[groupNumber]) {
      elvenGroups[groupNumber] = {
        badge: undefined,
        elves: [],
      };
    }
    elvenGroups[groupNumber].elves.push(elve);
  });

  Object.values(elvenGroups).forEach((group) => {
    const [e1, e2, e3] = group.elves;
    group.badge = e1
      .split("")
      .find((char) => e2.includes(char) && e3.includes(char));
    group.priority = getPriorityByChar(group.badge);
  });

  console.log(Object.values(elvenGroups).reduce((sum, val) => sum + Number(val.priority),0));
});
