import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { text, model, temperature, isJargonize } = await request.json();

  const prompt = isJargonize
    ? process.env.JARGONIZE_PROMPT
    : process.env.GENZIFY_PROMPT;

  const userContent = isJargonize
    ? `Convert the following text to corporate style : ${text} `
    : `Convert the following text to genz style : ${text} `;

  if (!text) {
    return NextResponse.json({ error: "Text is required!" }, { status: 400 });
  }
  try {
    // Add GROQ API calling
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: model,
        messages: [
          {
            role: "system",
            content: prompt,
          },
          {
            role: "user",
            content: userContent,
          },
        ],
        max_tokens: 150,
        temperature: temperature,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      result: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error : ", error);
    return NextResponse.json({ error: "Failed to generate!" }, { status: 500 });
  }
}
