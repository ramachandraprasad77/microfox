## Class: `GoogleGenAI`

Provides access to Gemini API features. Supports both Gemini Developer API and Vertex AI.

**Purpose:**

This class is the main entry point for interacting with the Gemini API. It allows you to access various functionalities like content generation, image generation, chat management, file uploads, and live sessions.

**Parameters:**

- **options**: _object_ - Configuration options for initializing the SDK.

  - **apiKey**: _string | undefined_ - API key for Gemini Developer API. Required for Gemini Developer API usage. Avoid exposing API keys in client-side code. Use server-side implementations in production environments.
  - **vertexai**: _boolean | undefined_ - Set to `true` for Vertex AI initialization. Defaults to `false`.
  - **project**: _string | undefined_ - Your Google Cloud project ID. Required for Vertex AI.
  - **location**: _string | undefined_ - Your Vertex AI location. Required for Vertex AI.

**Return Value:**

An instance of the `GoogleGenAI` class.

**Examples:**

```typescript
// Example 1: Initialization with API key for Gemini Developer API
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Example 2: Initialization for Vertex AI
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  vertexai: true,
  project: 'your-project-id',
  location: 'us-central1',
});
```

## Function: `generateContent`

Generates content based on the provided input and configuration.

**Purpose:**

This function allows you to generate text content using the specified Gemini model. It supports various configurations like function calling and tool usage.

**Parameters:**

- **request**: _object_ - The request object.

  - **model**: _string_ - The name of the Gemini model to use (e.g., "gemini-2.0-flash-001").
  - **contents**: _array<Content | string | Part>_ - The input content for generation. Can be a single `Content` object, an array of `Content` objects, a single `string`, an array of `strings`, a single `Part`, or an array of `Part` objects. See detailed explanation below.
  - **config**: _object | undefined_ - Optional configuration for the generation.

    - **toolConfig**: _object | undefined_ - Configuration for tool usage.

      - **functionCallingConfig**: _object | undefined_ - Configuration for function calling.

        - **mode**: _FunctionCallingConfigMode | undefined_ - The function calling mode (e.g., "ANY", "NONE").
        - **allowedFunctionNames**: _array<string> | undefined_ - List of allowed function names.

    - **tools**: _array<object> | undefined_ - Array of tools to use.

      - **functionDeclarations**: _array<FunctionDeclaration> | undefined_ - Array of function declarations. Each function declaration is an object with:

        - **name**: _string_ - The name of the function.
        - **parameters**: _object_ - Parameters of the function.
          - **type**: _Type_ - The parameter type (e.g., "OBJECT", "STRING", "NUMBER").
          - **description**: _string | undefined_ - Description of the parameters.
          - **properties**: _object | undefined_ - Properties of the object type parameter. Each property is defined with its type and description.
          - **required**: _array<string> | undefined_ - List of required property names.

**Return Value:**

- _object_ - The response object.

  - **text**: _string_ - The generated text content.
  - **functionCalls**: _array<FunctionCall> | undefined_ - Function calls made during generation.

**Examples:**

```typescript
import { GoogleGenAI, FunctionCallingConfigMode, Type } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Example 1: Simple content generation
const response1 = await ai.models.generateContent({
  model: 'gemini-2.0-flash-001',
  contents: ['Why is the sky blue?'], // Using a string array
});
console.log(response1.text);

// Example 2: Content generation with function calling
const controlLightDeclaration = {
  name: 'controlLight',
  parameters: {
    type: Type.OBJECT,
    description: 'Set the brightness and color temperature of a room light.',
    properties: {
      brightness: {
        type: Type.NUMBER,
        description: 'Light level from 0 to 100.',
      },
      colorTemperature: {
        type: Type.STRING,
        description: 'Color temperature (daylight, cool, warm).',
      },
    },
    required: ['brightness', 'colorTemperature'],
  },
};

const response2 = await ai.models.generateContent({
  model: 'gemini-2.0-flash-001',
  contents: 'Dim the lights so the room feels cozy and warm.',
  config: {
    toolConfig: {
      functionCallingConfig: {
        mode: FunctionCallingConfigMode.ANY,
        allowedFunctionNames: ['controlLight'],
      },
    },
    tools: [{ functionDeclarations: [controlLightDeclaration] }],
  },
});

console.log(response2.functionCalls);

// Example 3: Using Content object
const response3 = await ai.models.generateContent({
  model: 'gemini-2.0-flash-001',
  contents: [{ role: 'user', content: 'Why is the sky blue?' }],
});
console.log(response3.text);

// Example 4: Using array of Content objects
const response4 = await ai.models.generateContent({
  model: 'gemini-2.0-flash-001',
  contents: [
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi there!' },
    { role: 'user', content: 'How are you?' },
  ],
});
console.log(response4.text);
```

## How to structure `contents` argument for `generateContent`

The `contents` parameter accepts various input formats:

- **Content:** A single `Content` object will be wrapped in an array.
- **Content[]:** An array of `Content` objects will be used directly.
- **Part | string:** A single `Part` object or string will be wrapped in a `Content` object with the role 'user'.
- **Part[] | string[]:** An array of `Part` objects or strings will be wrapped in a single `Content` object with the role 'user'.

**Note:** This automatic wrapping does not apply to `FunctionCall` and `FunctionResponse` parts. When using these, you must explicitly provide the full `Content[]` structure, indicating the role for each part. The SDK will throw an error if you mix automatic wrapping with `FunctionCall` or `FunctionResponse`.

## Function: `generateContentStream`

Streams generated content chunk by chunk.

**Purpose:**

Provides a more responsive interaction with the API by yielding chunks of generated content as they become available.

**Parameters:**

- **request**: _object_ - The request object (same structure as `generateContent`).

**Return Value:**

An AsyncIterable that yields chunks of the generated content. Each chunk is an object with a `text` property containing the partial generated text.

**Example:**

```typescript
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-001',
    contents: 'Write a 100-word poem.',
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
```

## Environment Variables

- **GEMINI_API_KEY**: _(Required for Gemini Developer API)_ Your Gemini API key. Obtain this from Google AI Studio. **Important:** Avoid exposing API keys in client-side code. Use server-side implementations in production environments.
