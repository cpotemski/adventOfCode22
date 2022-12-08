const { arraySum } = require("../utils");
const fs = require("fs");

const DIRECTORY = 'dir';
const FILE = 'file';

const rootDir = {name: '/', type: DIRECTORY, size: 0, files:[]}
let currentDirectory = rootDir;
let listMode = false;

const createIfNotExists = (name, type, size = 0) => {
  const file = currentDirectory.files.find(file => file.name === name && file.type === type)
  if(!file) {
    let newFile = {name, type, size}
    if(type === FILE) {
      currentDirectory.files.push(newFile)
      updateParentDirectorySizes(currentDirectory, size);
    } else {
      currentDirectory.files.push({...newFile, files: [], parent: currentDirectory  })
    }
  }

  return file;
}

const updateParentDirectorySizes = (directory, size) => {
  directory.size += size;
  if(directory.parent) {
    updateParentDirectorySizes(directory.parent, size);
  }
}


fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split('\n');
  let counter = 0;
  lines.forEach(line => {
    counter++;
    if(line.startsWith('$ ')) {
      // command
      listMode = false;

      const command = line.replace('$ ','');
      if(command === 'ls') {
        listMode = true;
      } else {
        // change dir
        const dirName = command.split(' ')[1];
        if(dirName === '..') {
          currentDirectory = currentDirectory.parent;
        } else if(dirName === '/') {
          currentDirectory = rootDir;
        } else {
          const newDirectory = createIfNotExists(dirName, DIRECTORY);
          currentDirectory = newDirectory;
        }
      }
    } else {
      const [dirOrSize, name] = line.split(' ');
      if(dirOrSize === DIRECTORY) {
        createIfNotExists(name, DIRECTORY);
      } else {
        createIfNotExists(name, FILE, Number(dirOrSize));
      }
    }
  })

  // console.log(rootDir);

  const smallDirectorySizes = [];

  const findSmallDirectories = (directory) => {
    if(directory.size <= 100000) {
      smallDirectorySizes.push(directory.size);
    }
    if(directory.files) {
      directory.files.filter(file => file.type === DIRECTORY).forEach(findSmallDirectories);
    }
  }

  findSmallDirectories(rootDir);

  console.log('sum of small directories', arraySum(smallDirectorySizes));

  // part 2

  const directorySizes = [];
  const currentFreeSpace = 70000000 - rootDir.size;
  const spaceToDelete = 30000000 - currentFreeSpace;


  const collectDirectorySizes = (directory) => {
    if(directory.size >= spaceToDelete) {
      directorySizes.push(directory.size);
    }
    if(directory.files) {
      directory.files.filter(file => file.type === DIRECTORY).forEach(collectDirectorySizes);
    }
  }

  collectDirectorySizes(rootDir);

  console.log(`smallest directory size to free up ${spaceToDelete} is `, directorySizes.sort((a,b) => b-a)[directorySizes.length - 1]);
});