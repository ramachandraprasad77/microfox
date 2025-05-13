## Function: `suggestSearch`

Retrieves search suggestions using the Brave Search API.

**Purpose:**
This function provides search suggestions based on a given query.

**Parameters:**

* `params` (SuggestSearchParams, required): An object containing the search parameters.
    * `q` (string, required): The search query.
    * `country` (string, optional): 2-letter country code.
    * `count` (number, optional): Number of suggestions.

**Return Value:**

* `Promise<SuggestSearchApiResponse>`: A promise that resolves to the search suggestions response.

**Examples:**

```typescript
// Example: Retrieving search suggestions
const suggestions = await braveSDK.suggestSearch({ q: 'java' });
```