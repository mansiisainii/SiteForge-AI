const extractJson = async (text) => {
if (!text) {
return null;
}

const cleaned = text
.replace(/```json/gi, "")
.replace(/```/g, "")
.trim();

const openBracket = cleaned.indexOf("{");
const closeBracket = cleaned.lastIndexOf("}");

if (openBracket === -1 || closeBracket === -1) {
return null;
}

const jsonString = cleaned.slice(
openBracket,
closeBracket + 1
);

try {
    console.log("JSON STRING:");
console.log(jsonString);
return JSON.parse(jsonString);
} catch (err) {
console.log("JSON PARSE ERROR:");
console.log(err.message);

```
const pos = Number(
  err.message.match(/\d+/)?.[0]
);

if (!isNaN(pos)) {
  console.log(
    "ERROR NEAR:",
    jsonString.substring(
      Math.max(0, pos - 200),
      pos + 200
    )
  );
}

return null;
```

}
};

export default extractJson;
