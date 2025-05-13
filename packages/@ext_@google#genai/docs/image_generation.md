## Function: `generate_content`

Generates text and image content using the Gemini API.

**Purpose:**
This function allows you to generate text and image content based on a provided prompt, which can include text, images, or a combination of both. It's useful for tasks like image generation, image editing, and creating illustrated text content.

**Parameters:**

- `model` (string, required): The name of the Gemini model to use. For image generation, use "gemini-2.0-flash-preview-image-generation".
- `contents` (string | array<string | Image>, required): The input content for generation. This can be a single string, an array of strings, or a mix of strings and PIL.Image objects. If providing an image for editing, it should be a PIL.Image object.
- `config` (GenerateContentConfig, required): Configuration object for the generation.

**GenerateContentConfig Object:**

- `response_modalities` (array<string>, required): An array specifying the desired output modalities. For image generation, use `["TEXT", "IMAGE"]`. Image-only output is not supported.

**Return Value:**

- `GenerateContentResponse` object:

  - `candidates` (array<Candidate>): An array of generated content candidates.

    - `content` (Content): The generated content.

      - `parts` (array<Part>): An array of content parts, which can be text or inline data (images).

        - `text` (string | null): The generated text, if applicable.
        - `inline_data` (InlineData | null): The generated image data, if applicable.

          - `data` (bytes): The raw image data as bytes.

**Examples:**

```typescript
// Example 1: Text-to-image generation
import { Client, GenerateContentConfig } from '@google/genai';
import { Image } from 'pil-typescript'; // Assuming a TypeScript wrapper for PIL

const client = new Client();

const contents =
  'Hi, can you create a 3d rendered image of a pig with wings and a top hat flying over a happy futuristic scifi city with lots of greenery?';

const response = await client.models.generate_content({
  model: 'gemini-2.0-flash-preview-image-generation',
  contents: contents,
  config: {
    response_modalities: ['TEXT', 'IMAGE'],
  },
});

for (const part of response.candidates[0].content.parts) {
  if (part.text) {
    console.log(part.text);
  } else if (part.inline_data) {
    const image = Image.open(part.inline_data.data);
    image.save('gemini-native-image.png');
    image.show();
  }
}

// Example 2: Image Editing (text-and-image-to-image)
import { Client, GenerateContentConfig } from '@google/genai';
import { Image } from 'pil-typescript'; // Assuming a TypeScript wrapper for PIL

const client = new Client();

const image = Image.open('/path/to/image.png');

const textInput =
  'Hi, This is a picture of me. Can you add a llama next to me?';

const response = await client.models.generate_content({
  model: 'gemini-2.0-flash-preview-image-generation',
  contents: [textInput, image],
  config: {
    response_modalities: ['TEXT', 'IMAGE'],
  },
});

for (const part of response.candidates[0].content.parts) {
  if (part.text) {
    console.log(part.text);
  } else if (part.inline_data) {
    const image = Image.open(part.inline_data.data);
    image.show();
  }
}
```

## Function: `generate_images`

Generates images using the Imagen 3 model.

**Purpose:**
This function allows you to generate images based on a text prompt using the Imagen 3 model. It offers more control over image generation parameters like the number of images and aspect ratio.

**Parameters:**

- `model` (string, required): The name of the Imagen model to use. Use "imagen-3.0-generate-002".
- `prompt` (string, required): The text prompt describing the image to generate.
- `config` (GenerateImagesConfig, required): Configuration object for image generation.

**GenerateImagesConfig Object:**

- `number_of_images` (number, optional): The number of images to generate (1 to 4 inclusive). Defaults to 4.
- `aspect_ratio` (string, optional): The aspect ratio of the generated image. Supported values: "1:1", "3:4", "4:3", "9:16", "16:9". Defaults to "1:1".
- `person_generation` (string, optional): Controls the generation of images of people. "DONT_ALLOW", "ALLOW_ADULT" (default).

**Return Value:**

- `GenerateImagesResponse` object:

  - `generated_images` (array<GeneratedImage>): An array of generated images.

    - `image` (Image): The generated image.

      - `image_bytes` (bytes): The raw image data as bytes.

**Examples:**

```typescript
// Example: Generating images with Imagen 3
import { Client, GenerateImagesConfig } from '@google/genai';
import { Image } from 'pil-typescript'; // Assuming a TypeScript wrapper for PIL

const client = new Client({ apiKey: 'GEMINI_API_KEY' });

const response = await client.models.generate_images({
  model: 'imagen-3.0-generate-002',
  prompt: 'Robot holding a red skateboard',
  config: {
    number_of_images: 4,
  },
});

for (const generatedImage of response.generated_images) {
  const image = Image.open(generatedImage.image.image_bytes);
  image.show();
}
```

## Environment Variables

- **`GEMINI_API_KEY`**: Your Gemini API key. This is required for using the Gemini API.

This documentation provides a comprehensive guide to using the `generate_content` and `generate_images` functions of the Gemini API for image generation and editing tasks. It includes detailed explanations of parameters, return values, and example code in TypeScript. Remember to install the necessary libraries (`@google/genai`, `pil-typescript`) and replace placeholders like `/path/to/image.png` and `GEMINI_API_KEY` with actual values.
