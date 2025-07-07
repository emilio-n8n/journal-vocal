import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({});

  try {
    const [fields, files] = await form.parse(req);

    const transcription = Array.isArray(fields.transcription)
      ? fields.transcription[0]
      : fields.transcription;

    const images = Array.isArray(files.images) ? files.images : [files.images];

    if (!transcription) {
      return res.status(400).json({ message: "Transcription is required." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const imageParts = images
      .filter(Boolean)
      .map((file: any) => {
        const imageBuffer = fs.readFileSync(file.filepath);
        return {
          inlineData: {
            data: Buffer.from(imageBuffer).toString("base64"),
            mimeType: file.mimetype || "image/jpeg", // Default to jpeg if mimetype is not available
          },
        };
      });

    const prompt = `Generate a blog article based on the following transcription and images.
Transcription: ${transcription}
`;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const article = response.text();

    res.status(200).json({ article });
  } catch (error) {
    console.error("Error generating article:", error);
    res.status(500).json({ message: "Error generating article." });
  }
}
