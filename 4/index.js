const { arraySum } = require("../utils");
const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  const contained = lines.filter(line => {
    const [e1, e2] = line.split(',');
    const [e1min, e1max] = e1.split('-');
    const [e2min, e2max] = e2.split('-');
    return (Number(e1min) <= Number(e2min) && Number(e1max) >= Number(e2max)) || (Number(e2min) <= Number(e1min) && Number(e2max) >= Number(e1max));
  })

  console.log(contained.length)

  // part 2

  const overlapped = lines.filter(line => {
    const [e1, e2] = line.split(',');
    const [e1min, e1max] = e1.split('-');
    const [e2min, e2max] = e2.split('-');
    if(Number(e1min) <= Number(e2min)) {
      return Number(e1max) >= Number(e2max) || Number(e1max) >= Number(e2min);
    }
    if(Number(e2min) <= Number(e1min)) {
      return Number(e2max) >= Number(e1max) || Number(e2max) >= Number(e1min);
    }
  })

  console.log(overlapped.length)
});
