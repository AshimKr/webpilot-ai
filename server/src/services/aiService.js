import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

const buildPrompt = ({
  action,
  page,
  selectedText,
  userQuestion
}) => {
  switch (action) {
    case "summarize":
      return `
Summarize the following webpage.

Title:
${page.title}

URL:
${page.url}

Content:
${page.content}

Provide:
1. A short summary
2. The main ideas
3. Important takeaways

Keep the response clear and concise.
`;

    case "explain":
      return `
Explain the following text in simple terms.

Webpage:
${page.title}

Selected text:
${selectedText || page.content}

Explain the concept clearly.
Use a simple example when useful.
`;

    case "key-points":
      return `
Extract the most important points from this webpage.

Title:
${page.title}

Content:
${page.content}

Return 5-10 concise bullet points.
`;

    case "rewrite":
      return `
Rewrite the following text to make it clearer,
more professional, and easier to understand.

Selected text:
${selectedText || page.content}

Return only the rewritten version.
`;

    case "ask":
      return `
Answer the user's question using the webpage content below.

Webpage:
${page.title}

Content:
${page.content}

Selected text:
${selectedText || "None"}

User question:
${userQuestion}

If the answer cannot be determined from the provided webpage,
say so clearly.
`;

    default:
      throw new Error(`Unsupported AI action: ${action}`);
  }
};

export const generateAIResponse = async ({
  action,
  page,
  selectedText,
  userQuestion
}) => {
  const prompt = buildPrompt({
    action,
    page,
    selectedText,
    userQuestion
  });

  const response = await openai.chat.completions.create({
    model: process.env.OPENROUTER_MODEL,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.choices[0].message.content;
};