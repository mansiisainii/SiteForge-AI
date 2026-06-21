import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateResponse = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 8000,
    });

    const response =
      completion.choices[0]?.message?.content || "";

    console.log("=================================");
    console.log("AI RESPONSE START");
    console.log(response);
    console.log("AI RESPONSE END");
    console.log("=================================");

    return response;
  } catch (error) {
    console.error("GROQ ERROR:", error);
    throw new Error(error.message);
  }
};