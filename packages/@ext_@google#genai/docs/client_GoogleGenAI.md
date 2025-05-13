## Class: `GoogleGenAI`

The Google GenAI SDK. It provides access to GenAI features through either the Gemini.

When using the Gemini API, an `apiKey` must be provided in `GoogleGenAIOptions`.

## Constructor: `GoogleGenAI`

```typescript
new GoogleGenAI(options: GoogleGenAIOptions): GoogleGenAI
```

**Purpose:**
Initializes a new instance of the `GoogleGenAI` SDK.

**Parameters:**

- `options`: `GoogleGenAIOptions` - Required. Options for configuring the SDK.

  - `apiKey`: `string` - Optional. The API key for accessing the Gemini API.

**Return Value:**

- `GoogleGenAI` - A new instance of the `GoogleGenAI` SDK.

**Examples:**

```typescript
// Example 1: Initializing the SDK for using the Gemini API
import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({ apiKey: 'YOUR_GEMINI_API_KEY' });
```

## Environment Variables

- **`GEMINI_API_KEY`**:
  - **Display Name:** Gemini API Key
  - **Description:** The API key for authenticating with the Gemini API. This is required when using the Gemini API (`vertexai: false`).
  - **Required:** When `vertexai` is `false`.
  - **Format:** String
