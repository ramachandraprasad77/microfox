## Function: `embedContent`

Generates embeddings for given content. Embeddings are numerical representations of text that capture relationships between inputs, useful for tasks like semantic search, text classification, and clustering.

**Purpose:**
To convert text into numerical vectors that represent their semantic meaning, enabling various AI tasks like information retrieval, clustering, and classification.

**Parameters:**

- **model** (string, required): The name of the embedding model to use. Must be one of: "gemini-embedding-exp-03-07", "text-embedding-004", "embedding-001".
- **contents** (string | array<string>, required): The text content to embed. Can be a single string or an array of strings.
- **config** (EmbedContentConfig, optional): Configuration options for generating embeddings.

**EmbedContentConfig:**

- **task_type** (string, optional): The type of task the embeddings will be used for. Optimizes the embedding generation for the specified task. Possible values: "SEMANTIC_SIMILARITY", "CLASSIFICATION", "CLUSTERING", "RETRIEVAL_DOCUMENT", "RETRIEVAL_QUERY", "QUESTION_ANSWERING", "FACT_VERIFICATION", "CODE_RETRIEVAL_QUERY".

**Return Value:**

- **embeddings** (array<number>): An array of numerical vectors representing the embeddings of the input text. If `contents` is a single string, returns a single array of numbers. If `contents` is an array of strings, returns an array of arrays of numbers, where each inner array represents the embedding of a corresponding string in the input.

**Examples:**

```typescript
// Example 1: Minimal usage with a single string
const result1 = embedContent({
  model: 'gemini-embedding-exp-03-07',
  contents: 'What is the meaning of life?',
});

// Example 2: Embedding multiple strings
const result2 = embedContent({
  model: 'gemini-embedding-exp-03-07',
  contents: ['What is the meaning of life?', 'The universe is vast.'],
});
```

## Environment Variables

- **GEMINI_API_KEY** (string, required): Your Gemini API key. Used for authentication and authorization when making requests to the Gemini API. This key should be kept confidential and securely stored.
