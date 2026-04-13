require('dotenv').config();
const openAI = require("openai");


const client = new openAI({
    apiKey:process.env.OPENAI_API_KEY,
});


const analyzeCode = async (code) =>{
    try{
        const response = await client.chat.completions.create({
            model:"gpt-5-nano",
            messages: [
        {
          role: "system",
          content: "You are a senior software engineer who analyzes code."
        },
        {
          role: "user",
          content: `
You are a senior software engineer.

Analyze the following code and return STRICT JSON ONLY.

Rules:
- Do NOT include markdown
- Do NOT include explanations outside JSON
- Complexity must be in Big-O format like "O(n)", "O(1)"

Format:
{
  "bugs": ["..."],
  "code_smells": ["..."],
  "suggestions": ["..."],
  "complexity": "O(n)"
}

Code:
${code}
`
        }
      ],
         temperature:1
        });

        let text = response.choices[0].message.content;

        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(text);
    }
    catch(err){
        console.error("AI Error:", err.message);

        return {
            bugs: [],
            code_smells: [],
            suggestions: ["AI failed to analyze"],
            complexity:"Unknown"
        };
    }
}


module.exports = { analyzeCode };