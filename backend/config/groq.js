import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-3.6-flash',
  systemInstruction: "You MUST strictly output the EXACT format requested. NEVER output markdown code blocks. NO conversational text. START your response with ---MESSAGE--- and END with ---END---.",
  generationConfig: {
    maxOutputTokens: 8000
  }
})

export const generateResponse = async (prompt) => {
  let retries = 3;
  while (retries > 0) {
    try {
      const geminiResponse = await geminiModel.generateContent(prompt)
      let response = geminiResponse.response.text()
      
      // Fallback format fixer in case Gemini wraps the response in markdown or forgets tags
      if (!response.includes('---MESSAGE---') && response.includes('---CODE---')) {
         response = '---MESSAGE---\nHere is the code\n' + response;
      }
      if (!response.includes('---MESSAGE---') && response.includes('<html')) {
         response = '---MESSAGE---\nWebsite generated\n---CODE---\n' + response + '\n---END---';
      }
      if (response.includes('---CODE---') && !response.includes('---END---')) {
         response = response + '\n---END---';
      }

      console.log("=================================")
      console.log("AI RESPONSE START")
      console.log(response)
      console.log("AI RESPONSE END")
      console.log("=================================")

      return response
    } catch (error) {
      if (error.status === 503 && retries > 1) {
        console.warn(`503 Service Unavailable. Retrying... (${retries - 1} attempts left)`);
        retries--;
        await new Promise(resolve => setTimeout(resolve, 3000));
        continue;
      }
      console.error("GEMINI ERROR:", error)
      throw new Error(error.message)
    }
  }
}