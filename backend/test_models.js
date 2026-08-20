import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        if (data.models) {
             console.log('Available models:', data.models.map(m => m.name).join(', '));
        } else {
             console.log('Response:', data);
        }
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}
listModels();
