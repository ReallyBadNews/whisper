import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get OpenAI API key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// Get file name from command line
const fileName = process.argv[2];

const openai = new OpenAI({
  organization: "org-7fLRXZlSu6gdKyWdj5ilax2v",
  apiKey: OPENAI_API_KEY,
});

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(fileName),
    model: "whisper-1",
  });

  console.log(transcription.text);
  // write to file
  fs.writeFile("job.txt", transcription.text, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
    console.log("file written successfully");
  });
}

main();
