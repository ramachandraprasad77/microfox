# Google Gen AI SDK for TypeScript and JavaScript

[![NPM Downloads](https://img.shields.io/npm/dw/%40google%2Fgenai)](https://www.npmjs.com/package/@google/genai)
[![Node Current](https://img.shields.io/node/v/%40google%2Fgenai)](https://www.npmjs.com/package/@google/genai)

---

**Documentation:** https://googleapis.github.io/js-genai/

---

## Prerequisites

- Node.js version 18 or later

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
  const response = await client.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();
```

## Initialization

The Google Gen AI SDK provides support for both the
[Google AI Studio](https://ai.google.dev/gemini-api/docs) and
[Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview)
implementations of the Gemini API.

## GoogleGenAI overview

All API features are accessed through an instance of the `GoogleGenAI` classes.
The submodules bundle together related API methods:

- [`client.models`](https://googleapis.github.io/js-genai/main/classes/models.Models.html):
  Use `models` to query models (`generateContent`, `generateImages`, ...), or
  examine their metadata.
- [`client.caches`](https://googleapis.github.io/js-genai/main/classes/caches.Caches.html):
  Create and manage `caches` to reduce costs when repeatedly using the same
  large prompt prefix.
- [`client.chats`](https://googleapis.github.io/js-genai/main/classes/chats.Chats.html):
  Create local stateful `chat` objects to simplify multi turn interactions.
- [`client.files`](https://googleapis.github.io/js-genai/main/classes/files.Files.html):
  Upload `files` to the API and reference them in your prompts.
  This reduces bandwidth if you use a file many times, and handles files too
  large to fit inline with your prompt.
- [`client.live`](https://googleapis.github.io/js-genai/main/classes/live.Live.html):
  Start a `live` session for real time interaction, allows text + audio + video
  input, and text or audio output.

### Function Calling

To let Gemini to interact with external systems, you can provide provide
`functionDeclaration` objects as `tools`. To use these tools it's a 4 step

1. **Declare the function name, description, and parameters**
2. **Call `generateContent` with function calling enabled**
3. **Use the returned `FunctionCall` parameters to call your actual function**
4. **Send the result back to the model (with history, easier in `ai.chat`)
   as a `FunctionResponse`**

```typescript
import {
  GoogleGenAI,
  FunctionCallingConfigMode,
  FunctionDeclaration,
  Type,
} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function main() {
  const controlLightDeclaration: FunctionDeclaration = {
    name: 'controlLight',
    parameters: {
      type: Type.OBJECT,
      description: 'Set the brightness and color temperature of a room light.',
      properties: {
        brightness: {
          type: Type.NUMBER,
          description:
            'Light level from 0 to 100. Zero is off and 100 is full brightness.',
        },
        colorTemperature: {
          type: Type.STRING,
          description:
            'Color temperature of the light fixture which can be `daylight`, `cool`, or `warm`.',
        },
      },
      required: ['brightness', 'colorTemperature'],
    },
  };

  const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const response = await client.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Dim the lights so the room feels cozy and warm.',
    config: {
      toolConfig: {
        functionCallingConfig: {
          // Force it to call any function
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: ['controlLight'],
        },
      },
      tools: [{ functionDeclarations: [controlLightDeclaration] }],
    },
  });

  console.log(response.functionCalls);
}

main();
```

### Generate Content

#### How to structure `contents` argument for `generateContent`

The SDK allows you to specify the following types in the `contents` parameter:

#### Content

- `Content`: The SDK will wrap the singular `Content` instance in an array which
  contains only the given content instance
- `Content[]`: No transformation happens

#### Part

Parts will be aggregated on a singular Content, with role 'user'.

- `Part | string`: The SDK will wrap the `string` or `Part` in a `Content`
  instance with role 'user'.
- `Part[] | string[]`: The SDK will wrap the full provided list into a single
  `Content` with role 'user'.

**_NOTE:_** This doesn't apply to `FunctionCall` and `FunctionResponse` parts,
if you are specifying those, you need to explicitly provide the full
`Content[]` structure making it explicit which Parts are 'spoken' by the model,
or the user. The SDK will throw an exception if you try this.
