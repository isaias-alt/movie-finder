import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export const describeMovie = async (description: string, language: string) => {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "API key for Gemini is missing. Please define GEMINI_API_KEY in your environment."
    );
  }
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const promp = `Please describe the movie based on the following description in ${language}: "${description}".`;

  const response = await model.generateContent(promp);
  console.log(response);
  return response;
};
