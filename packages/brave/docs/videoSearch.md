## Function: `videoSearch`

Performs a video search using the Brave Search API.

**Purpose:**
This function allows you to search for videos using the Brave Search API.

**Parameters:**

* `params` (VideoSearchParams, required): An object containing the search parameters.  This is the same as `WebSearchParams` but without the `summary` and `extra_snippets` properties.
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

**Return Value:**

* `Promise<VideoSearchApiResponse>`: A promise that resolves to the video search response.

**Examples:**

```typescript
// Example: Performing a video search
const results = await braveSDK.videoSearch({ q: 'dogs' });
```