## Function: `webSearch`

Performs a web search using the Brave Search API.

**Purpose:**
This function allows you to perform web searches and retrieve results from the Brave Search API.

**Parameters:**

* `params` (WebSearchParams, required): An object containing the search parameters.
    * `q` (string, required): The search query (max 400 characters, 50 words).
    * `country` (string, optional): 2-letter country code.
    * `search_lang` (string, optional): Search language.
    * `ui_lang` (string, optional): UI language.
    * `count` (number, optional): Number of results (max 20).
    * `offset` (number, optional): Offset for pagination (max 9).
    * `safesearch` (enum, optional): Safe search level ('off', 'moderate', 'strict').
    * `freshness` (enum | string, optional): Freshness of results ('pd', 'pw', 'pm', 'py' or a custom string).
    * `text_decorations` (boolean, optional): Include decoration markers.
    * `spellcheck` (boolean, optional): Enable spellchecking.
    * `result_filter` (string, optional): Comma-separated list of result types.
    * `goggles` (array<string>, optional): Goggle definitions.
    * `units` (enum, optional): Units for measurements ('metric', 'imperial').
    * `extra_snippets` (boolean, optional): Include extra snippets.
    * `summary` (boolean, optional): Enable summary key generation.

**Return Value:**

* `Promise<WebSearchApiResponse>`: A promise that resolves to the web search response.

**Examples:**

```typescript
// Example: Performing a web search
const results = await braveSDK.webSearch({ q: 'TypeScript' });
```