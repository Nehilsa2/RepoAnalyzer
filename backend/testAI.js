require('dotenv').config();
const { analyzeCode } = require('./services/aiService');

const test = async () => {
  const code = `
  function add(a, b) {
    return a + b
  }
  `;

  const result = await analyzeCode(code);
  console.log(result);
};

test();