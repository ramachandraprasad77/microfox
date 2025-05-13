## Function: `spellcheckSearch`

Performs a spell check using the Brave Search API.

**Purpose:**
This function checks the spelling of a given query.

**Parameters:**

* `params` (SpellcheckSearchParams, required): An object containing the search parameters.
    * `q` (string, required): The search query.
    * `country` (string, optional): 2-letter country code.

**Return Value:**

* `Promise<SpellcheckSearchApiResponse>`: A promise that resolves to the spell check response.

**Examples:**

```typescript
// Example: Performing a spell check
const spellcheckResult = await braveSDK.spellcheckSearch({ q: 'javascrpt' });
```