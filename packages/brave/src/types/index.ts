import { z } from 'zod';

export type BraveSDKOptions = {
  apiKey?: string;
};

export type WebSearchParams = {
  q: string;
  country?: string;
  search_lang?: string;
  ui_lang?: string;
  count?: number;
  offset?: number;
  safesearch?: 'off' | 'moderate' | 'strict';
  freshness?: 'pd' | 'pw' | 'pm' | 'py' | string;
  text_decorations?: boolean;
  spellcheck?: boolean;
  result_filter?: string;
  goggles?: string[];
  units?: 'metric' | 'imperial';
  extra_snippets?: boolean;
  summary?: boolean;
};

export type LocalSearchParams = {
  ids: string[];
  search_lang?: string;
  ui_lang?: string;
  units?: 'metric' | 'imperial';
};

export type SummarizerSearchParams = {
  key: string;
  entity_info?: boolean;
};

export type ImageSearchParams = Omit<WebSearchParams, 'summary' | 'extra_snippets'>;
export type VideoSearchParams = Omit<WebSearchParams, 'summary' | 'extra_snippets'>;
export type NewsSearchParams = Omit<WebSearchParams, 'summary' | 'extra_snippets'>;

export type SuggestSearchParams = {
  q: string;
  country?: string;
  count?: number;
};

export type SpellcheckSearchParams = {
  q: string;
  country?: string;
};

// Response types
// Note: These are placeholder types. You should replace them with the actual response structures from the API documentation.

export type WebSearchApiResponse = {
  // Define the structure based on the API documentation
};

export type LocalPoiSearchApiResponse = {
  // Define the structure based on the API documentation
};

export type LocalDescriptionsSearchApiResponse = {
  // Define the structure based on the API documentation
};

export type SummarizerSearchApiResponse = {
  // Define the structure based on the API documentation
};

export type ImageSearchApiResponse = {
  // Define the structure based on the API documentation
};

export type VideoSearchApiResponse = {
  // Define the structure based on the API documentation
};

export type NewsSearchApiResponse = {
  // Define the structure based on the API documentation
};

export type SuggestSearchApiResponse = {
  // Define the structure based on the API documentation
};

export type SpellcheckSearchApiResponse = {
  // Define the structure based on the API documentation
};
