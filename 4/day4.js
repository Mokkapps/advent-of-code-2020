const fs = require("fs");
const data = fs.readFileSync(__dirname + "/input.txt", 'utf8');


const expectedFields = {
    "byr": true,
    "iyr": true,
    "eyr": true,
    "hgt": true,
    "hcl": true,
    "ecl": true,
    "pid": true,
    "cid": false,
}

const ex1 = async () => {
  try {
    const passports = data.trim().split('\n\n').map(p => p.replace(/\s/g, '\n').split('\n'));
    console.log('Found ' + passports.length + ' passports');

    const invalidPassports = [];
    for (const passport of passports) {
        let isPassportValid = true;
        for (const field of Object.entries(expectedFields)) {
            const [key, value] = field;

            if (value === true) { 
                const passKeys = passport.map(p => p.split(':')[0]);

                if (!passKeys.includes(key)) {
                    // console.warn(`Pass keys "${passKeys}" do not include mandatory field ${key}`)
                    isPassportValid = false;
                }
            }
        }
        if (!isPassportValid) {
            invalidPassports.push(isPassportValid);
        }
    }
    console.log(`Found ${passports.length - invalidPassports.length} valid passports`)
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};


// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
//     If cm, the number must be at least 150 and at most 193.
//     If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

const expectedFieldsEx2 = {
    "byr": {
        required: true,
        regex: /^(192[0-9]|19[3-9]\d|200[0-2])$/
    },
    "iyr": {
        required: true,
        regex: /^(201[0-9]|2020)$/
    },
    "eyr": {
        required: true,
        regex: /^(202[0-9]|2030)$/
    },
    "hgt": {
        required: true,
        regex: /^((15\d|1[6-8]\d|19\d)cm)|((59|6\d|7[0-6])in)$/
    },
    "hcl": {
        required: true,
        regex: /^#([0-9|a-f]{6})$/
    },
    "ecl": {
        required: true,
        regex: /^(amb|blu|brn|gry|grn|hzl|oth)$/
    },
    "pid": {
        required: true,
        regex: /^\d{9}$/
    },
    "cid": {
        required: false,
        regex: null
    },
}

const ex2 = async () => {
    try {
        const passports = data.trim().split('\n\n').map(p => p.replace(/\s/g, '\n').split('\n'));
        console.log('Found ' + passports.length + ' passports');
    
        const invalidPassports = [];
        passports.forEach((passport, index) => {
            let isPassportValid = true;
            console.log(`*** PASSPORT ${index} ***`);

            for (const field of Object.entries(expectedFieldsEx2)) {
                const [key, value] = field;
                const {required, regex} = value;

                if (required) {   
                    // check for required keys
                    const passKeys = passport.map(p => p.split(':')[0]);
                    if (!passKeys.includes(key)) {
                        console.warn(`Pass keys "${passKeys}" for passport ${index} do not include mandatory field ${key}`)
                        isPassportValid = false;
                        break;
                    }
                    // validate values
                    for (const pass of passport) {
                        const [passKey, passValue] = pass.split(':');
                        if (passKey === key) {
                            if (!passValue.match(regex)) {
                                console.warn(`Key ${passKey} for passport ${index} with value ${passValue} does not match regex ${regex}`)
                                isPassportValid = false;
                                break;
                            }
                        }
                    }
                }
            }

            if (!isPassportValid) {
                console.log(`*** PUSH INVALID PASSPORT ${index} ***`);
                invalidPassports.push(true);
            }
        })

        console.log(invalidPassports.length + ' passports are invalid')
        console.log(`${passports.length - invalidPassports.length} passports are valid`)
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

// ex1();
ex2();