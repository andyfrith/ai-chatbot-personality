import { google } from "@ai-sdk/google";
import { generateText, tool } from "ai";
import z from "zod";
import fs from "node:fs";
import "dotenv/config";

export const generateImage = tool({
  description: "Generate an image",
  inputSchema: z.object({
    prompt: z.string().describe("The prompt to generate the image from"),
  }),
  execute: async ({ prompt }) => {
    // const { image } = await experimental_generateImage({
    //   model: google("gemini-2.5-flash-image-preview"),
    //   prompt,
    // });
    console.log("Generating image... prompt:", prompt);

    const result = await generateText({
      model: google("imagen-latest"),
      prompt,
    });
    console.log("Generated result :", result);

    // Save generated images
    for (const file of result.files) {
      if (file.mediaType.startsWith("image/")) {
        const timestamp = Date.now();
        const fileName = `generated-${timestamp}.png`;

        fs.mkdirSync("output", { recursive: true });
        await fs.promises.writeFile(`output/${fileName}`, file.uint8Array);

        console.log(`Generated and saved image: output/${fileName}`);
      }
    }
    // in production, save this image to blob storage and return a URL
    return { image: result.files[0].base64, prompt };
  },
});
