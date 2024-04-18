import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import OpenAI from 'openai';

require('dotenv').config();
console.log(process.env);
const app = express();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.post("/api/storybook", async (req, res) => {
    // const { llm_choice, dalle_choice, story} = req.body;
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}],
        model: "gpt-3.5-turbo",
    });
    console.log("openai response: " + completion.choices[0]);
})

app.listen(5000, () => {
    console.log("Server running on localhost:5000")
})