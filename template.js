const fs = require("fs");
const data = fs.readFileSync(__dirname + "/input.txt", 'utf8').trim();

const ex1 = async () => {
  try {
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