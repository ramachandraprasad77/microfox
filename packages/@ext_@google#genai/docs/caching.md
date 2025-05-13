## Function: `createCache`

Creates a new cache entry with the provided content.

**Purpose:**
This function allows you to store a large piece of content in the cache, which can then be referenced in subsequent requests using its ID. This is particularly useful for scenarios where the same content is used repeatedly, as it can reduce costs and improve performance.

**Parameters:**

- `content`: string, **required**. The content to be cached. Minimum token count is 1024 for 2.5 Flash and 2048 for 2.5 Pro. Maximum token count is the same as the maximum for the given model.
- `ttl`: number (seconds), **optional**. The time-to-live (TTL) for the cache entry. This determines how long the cache entry will remain valid. If not provided, defaults to 1 hour (3600 seconds). There are no minimum or maximum bounds on the TTL.

**Return Value:**

- `cacheId`: string. The unique identifier for the newly created cache entry. This ID can be used in subsequent requests to reference the cached content.
- `usage_metadata`: object. Contains metadata about the cache operation.
  - `cached_tokens`: number. The number of tokens cached.

**Examples:**

```typescript
// Example 1: Minimal usage with required arguments
const cacheId1 = createCache({
  content: '<large content to be cached>',
});

// Example 2: Specifying TTL
const cacheId2 = createCache({
  content: '<large content to be cached>',
  ttl: 86400, // 24 hours
});
```

## Function: `getCache`

Retrieves a cache entry by its ID.

**Purpose:**
This function allows you to retrieve the content and metadata of a previously cached entry.

**Parameters:**

- `cacheId`: string, **required**. The ID of the cache entry to retrieve.

**Return Value:**

- `content`: string. The cached content.
- `ttl`: number. The remaining time-to-live (TTL) for the cache entry, in seconds.
- `usage_metadata`: object. Contains metadata about the cache operation.
  - `cached_tokens`: number. The number of tokens cached.

**Examples:**

```typescript
// Example: Retrieving a cached entry
const cacheEntry = getCache({
  cacheId: '<cacheId>',
});

console.log(cacheEntry.content);
console.log(cacheEntry.ttl);
console.log(cacheEntry.usage_metadata.cached_tokens);
```

## Function: `listCaches`

Lists all existing cache entries.

**Purpose:**
This function allows you to retrieve a list of all active cache entries and their metadata.

**Parameters:**
None

**Return Value:**

- `caches`: array<object>. An array of cache entries. Each entry has the following structure:
  - `cacheId`: string. The ID of the cache entry.
  - `ttl`: number. The remaining time-to-live (TTL) for the cache entry, in seconds.
  - `usage_metadata`: object. Contains metadata about the cache operation.
    - `cached_tokens`: number. The number of tokens cached.

**Examples:**

```typescript
// Example: Listing all caches
const caches = listCaches();

caches.forEach(cache => {
  console.log(cache.cacheId);
  console.log(cache.ttl);
  console.log(cache.usage_metadata.cached_tokens);
});
```

## Function: `deleteCache`

Deletes a cache entry by its ID.

**Purpose:**
This function allows you to remove a cache entry, freeing up resources.

**Parameters:**

- `cacheId`: string, **required**. The ID of the cache entry to delete.

**Return Value:**
None

**Examples:**

```typescript
// Example: Deleting a cache entry
deleteCache({
  cacheId: '<cacheId>',
});
```

## Environment Variables

- **GEMINI_API_KEY:** **Required**. Your Gemini API key. This is used to authenticate your requests to the Gemini API.

## Constructor Documentation

The Gemini API client can be constructed using the following configuration:

```typescript
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
```
