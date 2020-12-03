const fs = require("fs");
const numbers = fs.readFileSync(__dirname + "/input.txt", 'utf8').split('\n');

const day1ex1 = async () => {
  try {
    for (let i=0; i<numbers.length; i++) {
      for(let j=numbers.length - 1; j>=0; j--){
        const a = Number(numbers[i]);
        const b = Number(numbers[j]);
        if (a + b === 2020) {
          console.warn('Searched number', a * b);
        }
      }
    }
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

const day1ex2 = async () => {
  try {
    for (let i=0; i<numbers.length; i++) {
      for (let j=i; j<numbers.length; j++) {
        for (let k=i; k>0; k--){
          const a = Number(numbers[i]);
          const b = Number(numbers[j]);
          const c = Number(numbers[k]);
          // console.log({a, b, c});
          if (a + b + c === 2020){
            console.warn('SUM', a*b*c)
          }
        }
      } 
    }
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

day1ex2();