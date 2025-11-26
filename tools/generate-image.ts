// import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

import { experimental_generateImage, tool } from "ai";
import z from "zod";

export const generateImage = tool({
  description: "Generate an image",
  inputSchema: z.object({
    prompt: z.string().describe("The prompt to generate the image from"),
  }),
  execute: async ({ prompt }) => {
    const { image } = await experimental_generateImage({
      model: google.image("imagen-latest"),
      prompt,
    });
    // in production, save this image to blob storage and return a URL
    return { image: image.base64, prompt };
  },
});
