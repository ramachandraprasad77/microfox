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

## Function: `generate_content_stream`

Generates text content incrementally, providing a stream of responses.

**Purpose:**
This function allows for more fluid interactions by returning partial responses as they are generated, instead of waiting for the entire generation process to complete.

**Parameters:**

- `model` (string, required): The name of the Gemini model to use for generation. For example, "gemini-2.0-flash". See the Supported Models section for a list of available models.
- `contents` (array<string | Image>, required): An array of input contents. Each element can be a string or an image object. Strings represent text input, while image objects represent image input.

**Return Value:**

- `AsyncIterable<GenerateContentResponse>`: An asynchronous iterable that yields `GenerateContentResponse` objects as they become available.

**GenerateContentResponse:**

- `text` (string): A chunk of the generated text content.

**Examples:**

```typescript
// Example 1: Streaming text generation
import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({ apiKey: 'GEMINI_API_KEY' });

const responseStream = await client.models.generate_content_stream({
  model: 'gemini-2.0-flash',
  contents: ['Write a long story about a dragon.'],
});

for await (const chunk of responseStream) {
  console.log(chunk.text);
}
```

## Function: `chats.create`

Creates a new chat session.

**Purpose:**
This function initializes a chat session, allowing for multi-turn conversations with the model.

**Parameters:**

- `model` (string, required): The name of the Gemini model to use for the chat. For example, "gemini-2.0-flash". See the Supported Models section for a list of available models.

**Return Value:**

- `Chat` (object): A `Chat` object representing the new chat session. This object has methods like `send_message`, `send_message_stream`, and `get_history`.

## Function: `Chat.send_message`

Sends a message in a chat session.

**Purpose:**
This function sends a message to the model within an established chat session and receives a complete response.

**Parameters:**

- `message` (string, required): The message to send to the model.

**Return Value:**

- `ChatMessage` (object): An object containing the model's response.

**ChatMessage:**

- `text` (string): The model's response text.
- `role` (string): The role of the message sender (e.g., "user", "assistant").
- `parts` (array<object>): An array of message parts. Each part has a `text` field.

## Function: `Chat.send_message_stream`

Sends a message in a chat session and receives a streaming response.

**Purpose:**
This function sends a message to the model within an established chat session and receives a stream of responses as they are generated.

**Parameters:**

- `message` (string, required): The message to send to the model.

**Return Value:**

- `AsyncIterable<ChatMessage>`: An asynchronous iterable that yields `ChatMessage` objects as they become available.

**ChatMessage:**

- `text` (string): A chunk of the model's response text.
- `role` (string): The role of the message sender (e.g., "user", "assistant").
- `parts` (array<object>): An array of message parts. Each part has a `text` field.

## Function: `Chat.get_history`

Retrieves the message history of a chat session.

**Purpose:**
This function returns the entire conversation history of a chat session.

**Parameters:**
None

**Return Value:**

- `array<ChatMessage>`: An array of `ChatMessage` objects representing the conversation history.

**ChatMessage:**

- `text` (string): The message text.
- `role` (string): The role of the message sender (e.g., "user", "assistant").
- `parts` (array<object>): An array of message parts. Each part has a `text` field.

## Environment Variables

- **`GEMINI_API_KEY`**: Your Gemini API key. This is required for all API calls. This key should be treated as a secret and not exposed in client-side code.
