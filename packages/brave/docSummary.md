```markdown
# Brave Search API TypeScript SDK Documentation

This document outlines the Brave Search API endpoints and their usage for generating a TypeScript SDK.  All endpoints require an API key (`X-Subscription-Token`) obtained after subscribing to a plan (including the free plan).

## Common Request Headers

All API endpoints support these headers:

| Header        | Required | Type   | Description                                                                                                                                                                                                                                                                  |
|---------------|----------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Accept`       | False    | String | `application/json` (default)                                                                                                                                                                                                                            |
| `Accept-Encoding` | False    | String | `gzip` (supported compression type)                                                                                                                                                                                                                                |
| `Api-Version` | False    | String | Brave Web Search API version (YYYY-MM-DD). Defaults to latest. See [API Changelog](#api-changelog) for previous versions.                                                                                                                                 |
| `Cache-Control` | False    | String | Set to `no-cache` to prevent caching (best-effort). Defaults to caching enabled.                                                                                                                                                                                            |
| `User-Agent`   | False    | String | Client's user agent.  See documentation for platform-specific examples.                                                                                                                                                                                              |
| `X-Loc-Lat`   | False    | Number | Client's latitude (-90.0 to +90.0). Improves local results.                                                                                                                                                                                                     |
| `X-Loc-Long`  | False    | Number | Client's longitude (-180.0 to +180.0). Improves local results.                                                                                                                                                                                                    |
| `X-Loc-Timezone` | False    | String | Client's IANA timezone (e.g., `America/New_York`). See [IANA Database](https://www.iana.org/time-zones) and [Geonames Database](http://www.geonames.org/).                                                                                                  |
| `X-Loc-City`   | False    | String | Client's city name.                                                                                                                                                                                                                                                    |
| `X-Loc-State`  | False    | String | Client's state/region code (up to 3 characters).                                                                                                                                                                                                                        |
| `X-Loc-State-Name` | False    | String | Client's state/region name.                                                                                                                                                                                                                                           |
| `X-Loc-Country` | False    | String | Client's 2-letter country code (ISO 3166-1 alpha-2).                                                                                                                                                                                                              |
| `X-Loc-Postal-Code` | False    | String | Client's postal code.                                                                                                                                                                                                                                               |
| `X-Subscription-Token` | **True** | String | **API Key** (required for authentication).                                                                                                                                                                                                                  |


## API Endpoints

### 1. Web Search

* **Description:** Performs a web search and returns various types of results.
* **Endpoint:** `https://api.search.brave.com/res/v1/web/search`
* **Method:** `GET`
* **Query Parameters:** See [Web Search Query Parameters](#web-search-query-parameters)
* **Response:** `WebSearchApiResponse` (See [Response Objects](#response-objects))


### 2. Local Search - Points of Interest (POIs)

* **Description:** Retrieves extra information about locations (POIs) obtained from a web search. Requires a Pro plan.
* **Endpoint:** `https://api.search.brave.com/res/v1/local/pois`
* **Method:** `GET`
* **Query Parameters:** See [Local Search Query Parameters](#local-search-query-parameters)
* **Response:** `LocalPoiSearchApiResponse` (See [Response Objects](#response-objects))


### 3. Local Search - Descriptions

* **Description:** Retrieves AI-generated descriptions for locations (POIs). Requires a Pro plan.
* **Endpoint:** `https://api.search.brave.com/res/v1/local/descriptions`
* **Method:** `GET`
* **Query Parameters:** See [Local Search Query Parameters](#local-search-query-parameters)
* **Response:** `LocalDescriptionsSearchApiResponse` (See [Response Objects](#response-objects))


### 4. Summarizer Search

* **Description:** Retrieves a summary of web search results. Requires a Pro AI plan.
* **Endpoint:** `https://api.search.brave.com/res/v1/summarizer/search`
* **Method:** `GET`
* **Query Parameters:**  `key` (string, required) - The summarizer key obtained from a prior web search with `summary=1`.  Also supports optional parameters like `entity_info` (boolean).
* **Response:** `SummarizerSearchApiResponse` (See external documentation for details; not fully provided in the supplied documentation).


### 5.  Summarizer - other endpoints

The documentation mentions other summarizer endpoints, but lacks details on their parameters and responses.  These should be investigated further for complete SDK generation:

* `/res/v1/summarizer/summary`
* `/res/v1/summarizer/summary_streaming`
* `/res/v1/summarizer/title`
* `/res/v1/summarizer/enrichments`
* `/res/v1/summarizer/followups`
* `/res/v1/summarizer/entity_info`


### 6. Image Search

* **Description:** Performs an image search.
* **Endpoint:** `https://api.search.brave.com/res/v1/images/search`
* **Method:** `GET`
* **Query Parameters:**  See [Web Search Query Parameters](#web-search-query-parameters) (most parameters apply)
* **Response:**  (Not explicitly defined in the provided documentation.  Requires further investigation.)


### 7. Video Search

* **Description:** Performs a video search.
* **Endpoint:** `https://api.search.brave.com/res/v1/videos/search`
* **Method:** `GET`
* **Query Parameters:** See [Web Search Query Parameters](#web-search-query-parameters) (most parameters apply)
* **Response:** (Not explicitly defined in the provided documentation.  Requires further investigation.)


### 8. News Search

* **Description:** Performs a news search.
* **Endpoint:** `https://api.search.brave.com/res/v1/news/search`
* **Method:** `GET`
* **Query Parameters:** See [Web Search Query Parameters](#web-search-query-parameters) (most parameters apply)
* **Response:** (Not explicitly defined in the provided documentation.  Requires further investigation.)


### 9. Suggest Search

* **Description:**  Provides search suggestions for a given query.
* **Endpoint:** `https://api.search.brave.com/res/v1/suggest/search`
* **Method:** `GET`
* **Query Parameters:**  `q` (string, required), `country` (string), `count` (number)
* **Response:** (Not explicitly defined in the provided documentation.  Requires further investigation.)


### 10. Spellcheck Search

* **Description:** Spellchecks a given query.
* **Endpoint:** `https://api.search.brave.com/res/v1/spellcheck/search`
* **Method:** `GET`
* **Query Parameters:** `q` (string, required), `country` (string)
* **Response:** (Not explicitly defined in the provided documentation.  Requires further investigation.)



## Web Search Query Parameters


| Parameter        | Required | Type    | Default | Description                                                                                             |
|-----------------|----------|---------|---------|-----------------------------------------------------------------------------------------------------|
| `q`             | True     | String  |         | Search query (max 400 characters, 50 words).                                                        |
| `country`       | False    | String  | `US`    | 2-letter country code (See [Country Codes](#country-codes)).                                          |
| `search_lang`   | False    | String  | `en`    | Search language (See [Language Codes](#language-codes)).                                             |
| `ui_lang`       | False    | String  | `en-US` | UI language (See [Market Codes](#market-codes)).                                                      |
| `count`         | False    | Number  | 20      | Number of results (max 20).                                                                        |
| `offset`        | False    | Number  | 0       | Offset for pagination (max 9).                                                                       |
| `safesearch`    | False    | String  | `moderate` | `off`, `moderate`, or `strict`.                                                                 |
| `freshness`     | False    | String  |         | `pd` (24h), `pw` (7d), `pm` (31d), `py` (365d), or `YYYY-MM-DDtoYYYY-MM-DD`.                         |
| `text_decorations` | False    | Boolean | 1       | Include decoration markers (e.g., highlighting).                                                   |
| `spellcheck`    | False    | Boolean | 1       | Enable spellchecking.                                                                              |
| `result_filter` | False    | String  |         | Comma-separated list of result types (e.g., `discussions,videos`).                                 |
| `goggles`       | False    | Array[String] |         | Goggle definitions (see [Goggles Repository](not provided)).                                       |
| `units`         | False    | String  |         | `metric` or `imperial`.                                                                           |
| `extra_snippets` | False    | Boolean |         | Include extra snippets (Free AI, Base AI, Pro AI, Base Data, Pro Data, and Custom plans only).      |
| `summary`       | False    | Boolean |         | Enable summary key generation (required for summarization).                                          |



## Local Search Query Parameters

| Parameter      | Required | Type    | Default | Description                                                                      |
|---------------|----------|---------|---------|----------------------------------------------------------------------------------|
| `ids`         | True     | Array[String] |         | List of location IDs (max 20).  Can repeat the parameter for multiple IDs.       |
| `search_lang` | False    | String  | `en`    | Search language (See [Language Codes](#language-codes)).                           |
| `ui_lang`     | False    | String  | `en-US` | UI language (See [Market Codes](#market-codes)).                                   |
| `units`       | False    | String  |         | `metric` or `imperial`.                                                           |



## Response Objects

The documentation provides detailed structures for some, but not all, response types.  Missing response definitions need to be obtained for complete SDK generation.  See the original documentation for the available response object definitions:  `WebSearchApiResponse`, `LocalPoiSearchApiResponse`, `LocalDescriptionsSearchApiResponse`, `Query`, `Discussions`, etc.



## Authentication

API Key (`X-Subscription-Token`) is required for all endpoints.


## API Changelog

See the original documentation for the API changelog.  This is important for versioning the SDK and handling breaking changes.



## Country Codes, Language Codes, and Market Codes

See the original documentation for lists of supported country codes, language codes, and market codes.  These should be included as enums or constants in the TypeScript SDK.


## Edge Cases

* **Rate Limiting:** Pay attention to the `X-RateLimit-*` response headers to implement proper rate limiting handling in the SDK.
* **Summarizer Flow:** The summarizer requires a two-step process: (1) Web search with `summary=1` to get a key, (2) Summarizer search with the key.  The SDK should encapsulate this logic.
* **Missing Response Definitions:** Obtain complete response definitions for all endpoints for robust type safety.
* **Goggles:** The `goggles` parameter requires further investigation and documentation from the Goggles Repository.


This comprehensive summary provides the necessary information to begin generating a TypeScript SDK for the Brave Search API.  However, remember to fill in the missing response definitions and handle the edge cases for a robust and reliable SDK.
```
