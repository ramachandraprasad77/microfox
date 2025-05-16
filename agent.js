import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import { exec } from "child_process";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/completions";

if (!OPENAI_API_KEY) {
    console.error("🚨 Missing API key. Please set OPENAI_API_KEY in your .env file.");
    process.exit(1);
}

async function generateCode(prompt) {
    try {
        console.log(`🔍 Generating code for: "${prompt}"`);
        
        const response = await axios.post(OPENAI_API_URL, {
            model: "gpt-3.5-turbo",
            prompt: `Write working code for: ${prompt}`,
            temperature: 0.7,
            max_tokens: 150
        }, {
            headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
        });

        if (response.status !== 200) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const generatedCode = response.data.choices[0].text.trim();
        console.log("✅ Code successfully generated!");
        return generatedCode;
    } catch (error) {
        console.error("❌ Error generating code:", error.response ? error.response.data : error.message);
        return null;
    }
}

async function deployCode(code) {
    const filename = "generated_script.js";
    fs.writeFileSync(filename, code);

    console.log(`🚀 Executing generated code in ${filename}...`);

    exec(`node ${filename}`, (error, stdout, stderr) => {
        if (error) {
            console.error("❌ Execution error:", error);
        } else {
            console.log("📜 Output:\n", stdout);
        }
    });
}


async function improveCode(previousCode, feedback) {
    const prompt = `Improve this code based on feedback:\n\n${previousCode}\n\nFeedback: ${feedback}`;
    return generateCode(prompt);
}

(async () => {
    const prompt = process.argv[2] || "Create a simple web server with Express.js";
    const code = await generateCode(prompt);

    if (code) {
        console.log("🔹 Generated Code:\n", code);
        deployCode(code);
    }
})();