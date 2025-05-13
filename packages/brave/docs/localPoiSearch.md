## Function: `localPoiSearch`

Performs a local POI search using the Brave Search API.

**Purpose:**
This function allows you to search for points of interest based on location IDs.

**Parameters:**

* `params` (LocalSearchParams, required): An object containing the search parameters.
    * `ids` (array<string>, required): List of location IDs (max 20).
    * `search_lang` (string, optional): Search language.
    * `ui_lang` (string, optional): UI language.
    * `units` (enum, optional): Units for measurements ('metric', 'imperial').

**Return Value:**

* `Promise<LocalPoiSearchApiResponse>`: A promise that resolves to the local POI search response.

**Examples:**

```typescript
// Example: Performing a local POI search
const results = await braveSDK.localPoiSearch({ ids: ['id1', 'id2'] });
```