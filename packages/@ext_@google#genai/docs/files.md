## Function: `upload`

Uploads a file to the Files API.  Use this when the total request size (including files, text prompt, system instructions, etc.) exceeds 20MB.

**Purpose:**
Stores a file for use with the Gemini API, returning a file object that can be used in subsequent API calls like `generate_content`.

**Parameters:**

* `file`: (string, required) The path to the file to upload.

**Return Value:**

* `File` object:  Represents the uploaded file.  Contains metadata about the file, including its name, which is used to reference it in other API calls.  The file itself cannot be downloaded via the API.

**Examples:**

```typescript
// Example 1: Uploading an MP3 file
const myfile = client.files.upload({ file: 'path/to/sample.mp3' });

// Example 2: Using the uploaded file in generate_content
const response = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: ["Describe this audio clip", myfile]
});

console.log(response.text);
```


## Function: `get`

Retrieves metadata for a previously uploaded file.

**Purpose:**
Verifies that a file was successfully uploaded and provides access to its metadata.

**Parameters:**

* `name`: (string, required) The name of the file, as returned by the `upload` function.

**Return Value:**

* `File` object: Contains metadata about the file.

**Examples:**

```typescript
// Example 1: Getting metadata for an uploaded file
const uploadedFile = client.files.upload({ file: 'path/to/sample.mp3' });
const fileMetadata = client.files.get({ name: uploadedFile.name });
console.log(fileMetadata);
```


## Function: `list`

Lists all files uploaded by the user.

**Purpose:**
Retrieves a list of all files currently stored for the user's project.

**Parameters:**
None

**Return Value:**

* `array<File>`: An array of `File` objects, each representing an uploaded file.

**Examples:**

```typescript
// Example 1: Listing all uploaded files
console.log('My files:');
const files = client.files.list();
for (const file of files) {
  console.log(' ', file.name);
}
```


## Function: `delete`

Deletes a previously uploaded file.

**Purpose:**
Removes a file from storage. Files are automatically deleted after 48 hours, but this function allows for manual deletion.

**Parameters:**

* `name`: (string, required) The name of the file to delete, as returned by the `upload` function.

**Return Value:**
None

**Examples:**

```typescript
// Example 1: Deleting an uploaded file
const uploadedFile = client.files.upload({ file: 'path/to/sample.mp3' });
client.files.delete({ name: uploadedFile.name });
```


## Type: `File`

Represents a file uploaded via the Files API.

**Fields:**

* `name`: (string) The unique identifier for the file.  Use this name to reference the file in other API calls.


## Environment Variables

* **GOOGLE_API_KEY:** (string, required) Your Google API key.  Used for authentication and authorization.


## Usage Information

* **Storage Limit:** 20GB per project.
* **File Size Limit:** 2GB per file.
* **Retention Period:** Files are automatically deleted after 48 hours.
* **Cost:** Free in all regions where the Gemini API is available.
* **Downloadability:** Files cannot be downloaded via the API after upload.  They can only be used within the Gemini API.


## File Prompting Strategies

These strategies can help improve the quality of responses when using files with the Gemini API:

* **Be Specific:** Provide clear and detailed instructions in your prompts.
* **Add Examples:** Include a few examples to demonstrate the desired output format and content.
* **Break Down Complex Tasks:** Divide complex tasks into smaller, manageable steps.
* **Specify Output Format:** Explicitly request the desired output format (e.g., markdown, JSON).
* **Image Placement:** For single-image prompts, place the image before the text.
* **Troubleshooting:**
    * If the model misses relevant image details, provide hints in the prompt.
    * If the output is too generic, ask the model to describe the image first or refer to it explicitly.
    * To identify the source of errors, ask the model to describe the image or explain its reasoning.
    * For hallucinations, reduce the temperature setting or request shorter descriptions.
    * Experiment with temperature and top-k sampling parameters.
