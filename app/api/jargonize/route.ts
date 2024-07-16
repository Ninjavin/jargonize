import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { text, model, temperature } = await request.json();

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
            content:
              "You are a corporate jargon expert. Your task is to transform regular sentences into corporate style, making them sound more professional and business-like. Respond with only the transformed text, without any explanations, additional context, or responses to queries. Transform the given text into professional corporate speak in English, even if the input is in Hinglish or any other language. Ensure your response is concise and does not look AI-generated. Avoid creating long paragraphs or email-style responses. Focus solely on converting the provided statement into corporate language. Do not answer any questions or provide any additional context. ",

            // content:
            // "You are a corporate jargon expert. Your task is to transform regular sentences into corporate style, making them sound more professional & business-like. Respond with only the transformed text, without any explanations or additional context. Transform the given text into professional corporate speak in English, even if the input is in Hinglish or any other language. Write texts such that it doesn't look AI-generated. Also, no need to write mails or extremely big paragraphs or answer user queries. Your only task is to convert the provided statement to corporate speak. Do not answer user queries!",
          },
          {
            role: "user",
            content: `Convert the following text to corporate style : ${text} `,
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
