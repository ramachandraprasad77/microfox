## Function: `localDescriptionsSearch`

Performs a local descriptions search using the Brave Search API.

**Purpose:**
This function allows you to search for local descriptions based on location IDs.

**Parameters:**

* `params` (LocalSearchParams, required): An object containing the search parameters.
    * `ids` (array<string>, required): List of location IDs (max 20).
    * `search_lang` (string, optional): Search language.
    * `ui_lang` (string, optional): UI language.
    * `units` (enum, optional): Units for measurements ('metric', 'imperial').

**Return Value:**

* `Promise<LocalDescriptionsSearchApiResponse>`: A promise that resolves to the local descriptions search response.

**Examples:**

```typescript
// Example: Performing a local descriptions search
const results = await braveSDK.localDescriptionsSearch({ ids: ['id1', 'id2'] });
```