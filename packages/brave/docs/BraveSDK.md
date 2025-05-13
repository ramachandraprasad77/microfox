## Constructor: `BraveSDK`

Initializes a new instance of the Brave SDK.

**Purpose:**
The constructor initializes the SDK with an API key, which is required for making requests to the Brave API. The API key can be provided either directly as a constructor parameter or via the `BRAVE_API_KEY` environment variable.

**Parameters:**

- `options` (optional): An object containing the API key.
  - `apiKey` (optional, string): Your Brave Search API key. If not provided, the constructor will try to use the `BRAVE_API_KEY` environment variable.

**Return Value:**

- A new instance of the `BraveSDK` class.

**Examples:**

```typescript
// Example 1: Initializing with an API key directly
const braveSDK = new BraveSDK({ apiKey: process.env.BRAVE_API_KEY });

// Example 2: Initializing with the API key from the environment variable
const braveSDK = new BraveSDK(); // Assumes BRAVE_API_KEY is set in the environment
```
