const { arrayUnique } = require("../utils");
const fs = require("fs");
const { create } = require("domain");

const crates = [];

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const chars = data.split('');

  const lastCharacters = [];

  const MARKER_LENGTH = 14;

  const markerFound = () => {
    return lastCharacters.length >= MARKER_LENGTH && lastCharacters.slice(-MARKER_LENGTH).filter(arrayUnique).length === MARKER_LENGTH
  }

  let index = 0;
  while (!markerFound()) {
    lastCharacters.push(chars[index]);
    index++;
  }

  console.log(lastCharacters.length, chars.length);
 
});