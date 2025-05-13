## Function: `createBraveSDK`

Creates a new instance of the Brave SDK.

**Purpose:**
This function creates and returns a new instance of the `BraveSDK` class, which can be used to interact with the Brave Search API.

**Parameters:**

* `options` (BraveSDKOptions, optional): An object containing the API key.
    * `apiKey` (string, optional): Your Brave Search API key. If not provided, the constructor will try to use the `BRAVE_API_KEY` environment variable.

**Return Value:**

* `BraveSDK`: A new instance of the `BraveSDK` class.

**Examples:**

```typescript
// Example 1: Creating a new instance with an API key
const braveSDK = createBraveSDK({ apiKey: 'YOUR_API_KEY' });

// Example 2: Creating a new instance using the API key from the environment variable
const braveSDK = createBraveSDK(); // Assumes BRAVE_API_KEY is set in the environment
```