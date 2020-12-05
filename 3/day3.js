const fs = require("fs");
const data = fs.readFileSync(__dirname + "/input.txt", 'utf8');


// The toboggan can only follow a few specific slopes (you opted for a cheaper model that prefers rational numbers); 
// start by counting all the trees you would encounter for the slope right 3, down 1:
// squares (.) and trees (#)

const ex1 = async () => {
  try {
    const lines = data.split('\n');
    const linesCount = lines.length;
    const repetition = lines.length / 8;
    console.log('lines', lines.length);
    console.log('repetition', repetition);

    const maze = lines.map(l => l.repeat(repetition))

    let reachedBottom = false;
    let row = 0;
    let col = 0;
    let treeCounter = 0;

    while(!reachedBottom) {
      const val = maze[row].charAt(col);
      console.log(`Value ${val} at row ${row} and col ${col}`);
      if (val === '#') {
        treeCounter++;
      }

      const updatedMazeRow = maze[row].split('');
      updatedMazeRow[col] = 'X';

      maze[row] = updatedMazeRow;

      row++;
      if (row === linesCount - 1) {
        reachedBottom = true;
      }
      col += 3;
    }
    //console.log(maze.join('\n'));
    console.log('Traversed trees', treeCounter);

  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

const ex2 = async () => {
  try {
    const lines = data.split('\n');
    const linesCount = lines.length;
    const repetition = 200;

    const rules = [
      {right: 1, down: 1},
      {right: 3, down: 1},
      {right: 5, down: 1},
      {right: 7, down: 1},
      {right: 1, down: 2},
    ]

    const traversedTreesPerRule = [];

    for (let i = 0; i < rules.length; i++) {
      const maze = lines.map(l => l.repeat(repetition))
      let reachedBottom = false;
      let row = 0;
      let col = 0;
      let treeCounter = 0;
      const rule = rules[i];
      console.log('Running rule ' + i, rule);

      while(!reachedBottom) {
        const val = maze[row].charAt(col);
        if (val === '#') {
          treeCounter++;
        }
        
        row += rule.down;
        col += rule.right;
        if (row >= linesCount - 1) {
          reachedBottom = true;
        }
      }
      traversedTreesPerRule.push(treeCounter);
    }

    console.log('Traversed trees per rule', traversedTreesPerRule, traversedTreesPerRule.reduce((prev, cur) => prev * cur));
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

//ex1();
ex2();