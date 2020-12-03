const fs = require("fs");
const data = fs.readFileSync(__dirname + "/input.txt", 'utf8').split('\n');

const ex1 = async () => {
  try {
    // console.log(data);

    const map = data.map(d => {
      const values = d.split(': ');
      const policy = values[0].split(' ');
      const range = policy[0].split('-');
      return {
        password: values[1],
        min: range[0],
        max: range[1],
        char: policy[1]
      }
    })

    // console.log(map);

    const validPasswords = map.filter(v => {
      const {password, min, max, char} = v;
      const charCount = password && password.match(new RegExp(char, "g")) ? password.match(new RegExp(char, "g")).length : 0;
      console.log({charCount, min, max});
      return charCount >= min && charCount <= max;
    })

    console.log('valid PW', validPasswords.length);

  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

const ex2 = async () => {
  try {
    const map = data.map(d => {
      const values = d.split(': ');
      const policy = values[0].split(' ');
      const range = policy[0].split('-');
      return {
        password: values[1],
        charPos1: range[0] ? Number(range[0]) - 1 : undefined,
        charPos2: range[1] ? Number(range[1]) - 1 : undefined,
        char: policy[1]
      }
    })

    // console.log(map);

    const validPasswords = map.filter(v => {
      const {password, charPos1, charPos2, char} = v;

      if (!password) {
        return false;
      }
      const charAtPos1 = password[charPos1];
      const charAtPos2 = password[charPos2];
      console.log({charPos1, charAtPos1, charPos2, charAtPos2, password, char})
      return (charAtPos1 === char && charAtPos2 !== char) || (charAtPos1 !== char && charAtPos2 === char);
    })

    console.log('valid PW', validPasswords.length);

  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

//ex1();
ex2();