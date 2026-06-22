const extractJson = async (text) => {
  if (!text) {
    return null;
  }

  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```html/gi, "")
    .replace(/```/g, "")
    .trim();

  const messageMatch = cleaned.match(/---MESSAGE---([\s\S]*?)---CODE---/);
  const codeMatch = cleaned.match(/---CODE---([\s\S]*?)---END---/);

  if (!messageMatch || !codeMatch) {
    console.log("DELIMITER PARSE FAILED");
    console.log(cleaned.slice(0, 500));
    return null;
  }

  const message = messageMatch[1].trim();
  const code = codeMatch[1].trim();

  if (!code) {
    return null;
  }

  return { message, code };
};

export default extractJson;