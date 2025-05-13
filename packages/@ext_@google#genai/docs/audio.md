## Function: `upload`

Uploads a file to the Gemini API.

**Purpose:**
This function uploads a file to the Gemini API, which can then be used in subsequent calls to `generate_content` or `count_tokens`. This is particularly useful for large files or when the same file needs to be used multiple times, as it avoids including the file data directly in the request.

**Parameters:**

* `file`: (string | Blob) - **Required**. The path to the file to upload or a Blob object containing the file data.

**Return Value:**

* `FileObject`: An object representing the uploaded file. This object contains information about the uploaded file, including its ID, which can be used to reference it in other API calls.  The structure of the `FileObject` is:
    * `id`: (string) - The unique identifier of the uploaded file.
    * `mimeType`: (string) - The MIME type of the uploaded file (e.g., "audio/mp3", "audio/wav").
    * `name`: (string) - The original name of the uploaded file.
    * `size`: (number) - The size of the uploaded file in bytes.


**Examples:**

```typescript
// Example 1: Uploading a file from a path
const myfile = client.files.upload({ file: "path/to/sample.mp3" });

// Example 2: Uploading a file from a Blob
const blob = new Blob([audioData], { type: 'audio/mp3' });
const myfile = client.files.upload({ file: blob });

// Using the uploaded file in generate_content
const response = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: ["Describe this audio clip", myfile]
});
```


## Function: `generate_content`

Generates content based on a given prompt and optional audio data.

**Purpose:**
This function sends a request to the Gemini API to generate text content based on a provided prompt.  The prompt can include text, and optionally, audio data either uploaded via the `upload` function or provided inline.

**Parameters:**

* `model`: (string) - **Required**. The name of the Gemini model to use (e.g., "gemini-2.0-flash").  All possible values are strings representing available Gemini models.
* `contents`: (array<string | FileObject | Part>) - **Required**. An array of content parts. Each part can be a string (for text prompts), a `FileObject` (for uploaded files), or a `Part` object (for inline audio data).
    * `Part`: An object representing inline data.
        * `data`: (Uint8Array | string) - **Required**. The actual data, either as a `Uint8Array` or a base64 encoded string.
        * `mimeType`: (string) - **Required**. The MIME type of the data (e.g., "audio/mp3", "audio/wav"). All possible values are valid MIME types for audio files.


**Return Value:**

* `Response`: An object containing the generated content.
    * `text`: (string) - The generated text content.


**Examples:**

```typescript
// Example 1: Using an uploaded audio file
const myfile = client.files.upload({ file: "path/to/sample.mp3" });
const response = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: ["Describe this audio clip", myfile]
});
console.log(response.text);

// Example 2: Using inline audio data
const audioBytes = new Uint8Array([/* audio data */]); // Replace with actual audio data
const response = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: [
    "Describe this audio clip",
    { data: audioBytes, mimeType: "audio/mp3" }
  ]
});
console.log(response.text);

// Example 3: Getting a transcript
const myfile = client.files.upload({ file: "path/to/sample.mp3" });
const response = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: ["Generate a transcript of the speech.", myfile]
});
console.log(response.text);
```


## Function: `count_tokens`

Counts the number of tokens in the provided content.

**Purpose:**
This function estimates the number of tokens in the given content, which can be useful for managing costs and understanding the size of the input.

**Parameters:**

* `model`: (string) - **Required**. The name of the Gemini model to use for token counting (e.g., "gemini-2.0-flash"). All possible values are strings representing available Gemini models.
* `contents`: (array<string | FileObject>) - **Required**. An array of content parts. Each part can be a string (for text) or a `FileObject` (for uploaded files).


**Return Value:**

* `CountResponse`: An object containing the token count.
    * `tokenCount`: (number) - The estimated number of tokens in the provided content.


**Examples:**

```typescript
const myfile = client.files.upload({ file: "path/to/sample.mp3" });
const response = client.models.count_tokens({
  model: "gemini-2.0-flash",
  contents: [myfile]
});
console.log(response.tokenCount);
```

## Environment Variables

* **`GOOGLE_API_KEY`**:  **Required**. Your Gemini API key. This key is used to authenticate your requests to the Gemini API.  The value should be a string.


