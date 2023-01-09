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

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({
    message: "Hello",
  });
});

app.post("/", async (req: Request, res: Response) => {
  try {
    const propmpt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${propmpt}`,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

try {
  app.listen(port, (): void => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  const err = error as unknown as Error;
  console.error(`Error occured: ${err.message}`);
}
