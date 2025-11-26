import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { systemPrompt } from "@/lib/prompts/prompt";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt, // "You are a helpful assistant.",
    prompt,
  });

  return Response.json({ text });
}
