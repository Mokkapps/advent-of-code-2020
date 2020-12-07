const fs = require("fs");
const data = fs.readFileSync(__dirname + "/input.txt", 'utf8').trim();

const ex1 = async () => {
  try {
    const groups = data.split('\n\n').map(d => d.split('\n'));

    const yesAnswerQuestionCount = [];

    groups.forEach((group, i) => {
      const numberOfPeople = group.length;
      const answerMap = {};

      for (const answers of group) {
        const chars = answers.split('');
        for (const char of chars) {
          if (answerMap[char] === undefined) {
            answerMap[char] = 1;
          } else {
            answerMap[char] += 1;
          }
        }
      }

      const numberOfYesAnsweredQuestions = Object.keys(answerMap).length;
      console.log(`Group ${i} with ${numberOfPeople} people answered ${numberOfYesAnsweredQuestions} questions with yes : `, answerMap)
      yesAnswerQuestionCount.push(numberOfYesAnsweredQuestions)
    });

    console.log('Sum of all yes answered questions', yesAnswerQuestionCount.reduce((prev, curr) => prev + curr));

  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
}

const ex2 = async () => {
    try {
      const groups = data.split('\n\n').map(d => d.split('\n'));

      const yesAnswerQuestionCount = [];
  
      groups.forEach((group, i) => {
        const numberOfPeople = group.length;
        const answerMap = {};
  
        for (const answers of group) {
          const chars = answers.split('');
          for (const char of chars) {
            if (answerMap[char] === undefined) {
              answerMap[char] = 1;
            } else {
              answerMap[char] += 1;
            }
          }
        }
  
        let yesAnswers = 0;
        for (const entry of Object.entries(answerMap)) {
          const [char, count] = entry;
          if (count === numberOfPeople) {
            yesAnswers += 1;
          }
        }
        console.log(`Group ${i} with ${numberOfPeople} people answered ${yesAnswers} questions with yes : `, answerMap)
        yesAnswerQuestionCount.push(yesAnswers)
      });
  
      console.log('Sum of all yes answered questions', yesAnswerQuestionCount.reduce((prev, curr) => prev + curr));
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

// ex1();
ex2();