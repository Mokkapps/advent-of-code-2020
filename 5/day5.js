const fs = require("fs");
const data = fs.readFileSync(__dirname + "/input.txt", 'utf8');

const minRowFront = 0;
const maxRowFront = 63;
const minRowBack = 64;
const maxRowBack = 127;

const minCol = 0;
const maxCol = 7;

const ex1 = async () => {
  try {
      const boardingPasses = data.trim().split('\n').map(m => m.split(''));

      const seatIDs = [];
      const result = [];

      for (const pass of boardingPasses) {
          let rowMin = 0;
          let rowMax = 127;
          let colMin = 0;
          let colMax = 7;

          for (let i = 0; i < pass.length; i++) {
              const char = pass[i];
              switch(char) {
                  case 'F': 
                    rowMin = i === 0 ? minRowFront : rowMin;
                    rowMax = i === 0 ? maxRowFront : Math.floor((rowMin + rowMax) / 2);
                    break;
                  case 'B':
                    rowMin = i === 0 ? minRowBack : Math.round((rowMin + rowMax) / 2);
                    rowMax = i === 0 ? maxRowBack : rowMax;
                    break;
                  case 'L':
                    colMin = colMin;
                    colMax = Math.floor((colMin + colMax) / 2)
                    break;
                  case 'R':
                    colMin = Math.round((colMin + colMax) / 2);
                    colMax = colMax;
                    break;      
              }
              // console.log({i, char, colMin, colMax})
          }
          const row = pass[6] === 'F' ? rowMin : rowMax;
          const col = pass[9] === 'L' ? colMin : colMax;
          const seatId = (row * 8) + col;
          seatIDs.push(seatId);
          result.push({row, col, seatId});
          console.log(`${pass}: row ${rowMin}, column ${col}, seat ID ${seatId}.`)
      }

      console.log('Highest seat ID: ' + Math.max(...seatIDs));
      console.log('Total boarding passes', boardingPasses.length)

      for (let i = 0; i < (maxRowBack * maxCol); i++) {
        if (!result.find(r => r.seatId === i )) {
          console.log('Missing seat ID: ' + i);
          
          const lowerSeatId = result.find(r => r.seatId === i - 1)
          const higherSeatId = result.find(r => r.seatId === i + 1)

          if (lowerSeatId && higherSeatId) {
            console.log(`ID ${i} has a seat ID +1 and -1`)
          }
        }
        
      }

  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
}

const ex2 = async () => {
    try {
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

ex1();
// ex2();