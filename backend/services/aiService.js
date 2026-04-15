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
          content: "You are a senior software engineer who performs practical bug and reliability analysis for source code. Always return valid JSON only."
        },
        {
          role: "user",
          content: `
Analyze the code and return STRICT JSON.

Rules:
- Max 5 issues per file
- Focus on bugs and reliability risks
- Avoid repetition
- Include a concrete fix suggestion for every issue
- Provide a short 2-3 sentence summary for every file

Format:
{
  "files": [
    {
      "fileName": "",
      "summary": "",
      "issues": [
        {
          "message": "",
          "fix": ""
        }
      ]
    }
  ]
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
        files: []
        };
    }
}


module.exports = { analyzeCode };