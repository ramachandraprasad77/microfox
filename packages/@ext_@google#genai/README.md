## Installation

To install the SDK, run the following command:

```shell
npm install @google/genai
```

## Quickstart

The simplest way to get started is to using an API key from
[Google AI Studio](https://aistudio.google.com/apikey):

```typescript
import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
  const response = await client.models.generate_content({
    model: 'gemini-2.0-flash-001',
    contents: ['Why is the sky blue?'],
  });
  console.log(response.text);
}

main();
```

### Models

| Model Variant                                                                           | Input(s)                        | Output          | Optimized For                                                                        |
| --------------------------------------------------------------------------------------- | ------------------------------- | --------------- | ------------------------------------------------------------------------------------ |
| Gemini 2.5 Flash Preview 04-17 (`gemini-2.5-flash-preview-04-17`)                       | Audio, images, videos, and text | Text            | Adaptive thinking, cost efficiency                                                   |
| Gemini 2.5 Pro Preview (`gemini-2.5-pro-preview-05-06`)                                 | Audio, images, videos, and text | Text            | Enhanced thinking and reasoning, multimodal understanding, advanced coding, and more |
| Gemini 2.0 Flash (`gemini-2.0-flash`)                                                   | Audio, images, videos, and text | Text            | Next-generation features, speed                                                      |
| Gemini 2.0 Flash Preview Image Generation (`gemini-2.0-flash-preview-image-generation`) | Audio, images, videos, and text | Text, images    | Conversational image generation and editing                                          |
| Gemini 2.0 Flash-Lite (`gemini-2.0-flash-lite`)                                         | Audio, images, videos, and text | Text            | Cost efficiency and low latency                                                      |
| Gemini 1.5 Flash (`gemini-1.5-flash`)                                                   | Audio, images, videos, and text | Text            | Fast and versatile performance across a diverse variety of tasks                     |
| Gemini 1.5 Flash-8B (`gemini-1.5-flash-8b`)                                             | Audio, images, videos, and text | Text            | High volume and lower intelligence tasks                                             |
| Gemini 1.5 Pro (`gemini-1.5-pro`)                                                       | Audio, images, videos, and text | Text            | Complex reasoning tasks requiring more intelligence                                  |
| Gemini Embedding (`gemini-embedding-exp`)                                               | Text                            | Text embeddings | Measuring the relatedness of text strings                                            |
| Imagen 3 (`imagen-3.0-generate-002`)                                                    | Text                            | Images          | Advanced image generation                                                            |
| Veo 2 (`veo-2.0-generate-001`)                                                          | Text, images                    | Video           | High-quality video generation                                                        |
| Gemini 2.0 Flash Live (`gemini-2.0-flash-live-001`)                                     | Audio, video, and text          | Text, audio     | Low-latency bidirectional voice and video interactions                               |
