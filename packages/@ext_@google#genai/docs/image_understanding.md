## Function: `client.files.upload`

Uploads a file to be used with the Gemini API.

**Purpose:**
This function uploads a file to the Gemini API, which can then be used in subsequent calls to `generate_content`. This is particularly useful for larger files (>20MB) or when the same file needs to be used across multiple requests.

**Parameters:**

* `file`: (string | Blob) **Required**. The path to the local file to upload or a Blob object containing the file data.

**Return Value:**

* `FileObject`: An object representing the uploaded file. This object should be passed to `generate_content` to use the file in a prompt.  The structure is not explicitly defined in the provided documentation.

**Examples:**

```typescript
// Example 1: Uploading a local file
const uploadedFile = client.files.upload("path/to/sample.jpg");

// Example 2: Uploading a Blob (example using a hypothetical fetch and blob conversion)
fetch('https://example.com/image.png')
  .then(response => response.blob())
  .then(blob => client.files.upload(blob))
  .then(uploadedFile => {
    // Use uploadedFile in generate_content
  });
```


## Function: `client.models.generate_content`

Generates content based on a given prompt, which can include text, images, and other media.

**Purpose:**
This function is the core of the Gemini API. It takes a prompt, which can include text, images (uploaded or inline), and potentially other media types, and generates a response based on the specified model.

**Parameters:**

* `model`: (string) **Required**. The name of the Gemini model to use (e.g., "gemini-2.0-flash", "gemini-2.0-flash-exp").  See the Gemini API documentation for a list of available models.

* `contents`: (array<string | FileObject | Part>) **Required**. An array of prompt elements. Each element can be a string, a `FileObject` returned by `client.files.upload`, or a `Part` object for inline image data. The order of elements in the array determines the order they are presented to the model.

    * `Part`: Object representing inline data.

        * `data`: (string | Blob) **Required**. The data of the inline content.  If a string, it should be Base64 encoded.  Alternatively, a Blob can be provided.
        * `mimeType`: (string) **Required**. The MIME type of the data (e.g., "image/jpeg", "image/png").  See the Gemini API documentation for a list of supported MIME types.


**Return Value:**

* `Response`: An object containing the generated content.

    * `text`: (string) The generated text response.  Other fields may be present depending on the model and prompt.  The exact structure is not explicitly defined in the provided documentation.


**Examples:**

```typescript
// Example 1: Minimal usage with text prompt
const response1 = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: ["Caption this image."]
});

// Example 2: Using an uploaded file
const uploadedFile = client.files.upload("path/to/sample.jpg");
const response2 = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: [uploadedFile, "Caption this image."]
});

// Example 3: Inline image data from a local file (example using a hypothetical readFileAsDataURL)
const imageData = await readFileAsDataURL('path/to/small-sample.jpg');
const response3 = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: [
    { data: imageData, mimeType: 'image/jpeg' },
    "Caption this image."
  ]
});


// Example 4: Inline image data from a URL (example using a hypothetical fetch and blob conversion)
fetch('https://example.com/image.png')
  .then(response => response.blob())
  .then(blob => {
    return client.models.generate_content({
      model: "gemini-2.0-flash",
      contents: [
        { data: blob, mimeType: 'image/png' },
        "Caption this image."
      ]
    });
  })
  .then(response4 => {
    // Process response
  });

// Example 5: Multiple images (uploaded and inline)
const uploadedFile1 = client.files.upload("path/to/image1.jpg");
const imageData2 = await readFileAsDataURL('path/to/image2.png');
const response5 = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: [
    "What is different between these two images?",
    uploadedFile1,
    { data: imageData2, mimeType: 'image/png' }
  ]
});

// Example 6: Bounding box prompt
const uploadedFile3 = client.files.upload("path/to/image3.jpg");
const response6 = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: [
    uploadedFile3,
    "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000."
  ]
});

// Example 7: Segmentation prompt
const uploadedFile4 = client.files.upload("path/to/image4.jpg");
const response7 = client.models.generate_content({
  model: "gemini-2.0-flash",
  contents: [
    uploadedFile4,
    `
Give the segmentation masks for the wooden and glass items.
Output a JSON list of segmentation masks where each entry contains the 2D
bounding box in the key "box_2d", the segmentation mask in key "mask", and
the text label in the key "label". Use descriptive labels.
`
  ]
});
```


No constructor documentation was explicitly provided in the given text.  The provided examples assume an initialized `client` object.  Refer to the Gemini API documentation for details on client initialization and authentication.  The documentation mentions environment variables `GOOGLE_API_KEY` (required) and potentially others related to OAuth2 if applicable, such as `GOOGLE_ACCESS_TOKEN`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `SCOPES`.  Consult the Gemini API documentation for a complete list and descriptions of required environment variables.
