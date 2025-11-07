import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiKey: process.env.GEMINI_API_KEY ?? '',
};

const genAI = new GoogleGenerativeAI(config.apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

async function main() {
  const response = await model.generateContentStream(
    'Hello, how are you doing?'
  );

  for await (const chunk of response.stream) {
    const chunkText = chunk.text();
    process.stdout.write(chunkText);
  }
}

main();
