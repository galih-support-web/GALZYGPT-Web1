import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send({ error: "Only POST allowed" });

  const { message } = req.body;
  if (!message) return res.status(400).send({ error: "No message provided" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [{ role: "user", content: message }],
    });

    const aiMessage = response.choices[0].message.content;
    res.status(200).json({ reply: aiMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI tidak bisa dihubungi" });
  }
                                                          }
