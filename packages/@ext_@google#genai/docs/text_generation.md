## Function: `generate_content`

Generates text content based on the provided input and model.

**Purpose:**
This function is used to generate text output from various inputs, including text, images, video, and audio, leveraging Gemini models.

**Parameters:**

- `model` (string, required): The name of the Gemini model to use for generation. For example, "gemini-2.0-flash". See the Supported Models section for a list of available models.
- `contents` (array<string | Image>, required): An array of input contents. Each element can be a string or an image object. Strings represent text input, while image objects represent image input.
- `config` (GenerateContentConfig, optional): A configuration object to customize the generation process.

**GenerateContentConfig:**

- `system_instruction` (string, optional): System-level instructions to guide the model's behavior. For example, "You are a cat. Your name is Neko."
- `max_output_tokens` (number, optional): The maximum number of tokens allowed in the generated output.
- `temperature` (number, optional): Controls the randomness of the generated output. Lower values result in more predictable output, while higher values result in more creative output. Valid range is 0.0 to 1.0.

**Return Value:**

- `GenerateContentResponse` (object): An object containing the generated text.

**GenerateContentResponse:**

- `text` (string): The generated text content.

**Examples:**

```typescript
// Example 1: Minimal usage with only required arguments
import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({ apiKey: 'GEMINI_API_KEY' });

const response1 = await client.models.generate_content({
  model: 'gemini-2.0-flash',
  contents: ['How does AI work?'],
});

console.log(response1.text);

// Example 3: Text-only input with optional config
import { GoogleGenAI, GenerateContentConfig } from '@google/genai';

const client = new GoogleGenAI({ apiKey: 'GEMINI_API_KEY' });

const response3 = await client.models.generate_content({
  model: 'gemini-2.0-flash',
  contents: ['Explain quantum physics.'],
  config: new GenerateContentConfig({
    max_output_tokens: 200,
    temperature: 0.1,
  }),
});

console.log(response3.text);
```
