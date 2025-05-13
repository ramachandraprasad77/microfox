## Function: `summarizerSearch`

Performs a summarizer search using the Brave Search API.

**Purpose:**
This function allows you to retrieve summaries based on a provided key.

**Parameters:**

* `params` (SummarizerSearchParams, required): An object containing the search parameters.
    * `key` (string, required): The summarizer key obtained from a prior web search.
    * `entity_info` (boolean, optional): Include entity information.

**Return Value:**

* `Promise<SummarizerSearchApiResponse>`: A promise that resolves to the summarizer search response.

**Examples:**

```typescript
// Example: Performing a summarizer search
const results = await braveSDK.summarizerSearch({ key: 'summary_key' });
```