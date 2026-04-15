const { ESLint } = require("eslint");

const eslint = new ESLint({
  overrideConfig: {
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  useEslintrc: false,
});

const runESLint = async (code) => {
  try {
    const results = await eslint.lintText(code);

    const messages = results[0].messages;

    return messages.map((msg) => ({
      line: msg.line,
      message: msg.message,
      severity: msg.severity === 2 ? "high" : "medium",
    }));

  } catch (err) {
    console.error("ESLint Error:", err.message);
    return [];
  }
};

module.exports = { runESLint };