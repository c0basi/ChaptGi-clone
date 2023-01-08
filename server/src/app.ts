import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3004;
const configuration = new Configuration({
  apiKey: process.env.OPENAPI_KEY,
});
const openai = new OpenAIApi(configuration);

// Body parsing Middleware
app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded({ limit: "500kb", extended: true }));
app.use(cors());
try {
  app.listen(port, (): void => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  const err = error as unknown as Error;
  console.error(`Error occured: ${err.message}`);
}
