import { z } from 'zod';
import {
  BraveSDKOptions,
  WebSearchParams,
  LocalSearchParams,
  SummarizerSearchParams,
  ImageSearchParams,
  VideoSearchParams,
  NewsSearchParams,
  SuggestSearchParams,
  SpellcheckSearchParams,
  WebSearchApiResponse,
  LocalPoiSearchApiResponse,
  LocalDescriptionsSearchApiResponse,
  SummarizerSearchApiResponse,
  ImageSearchApiResponse,
  VideoSearchApiResponse,
  NewsSearchApiResponse,
  SuggestSearchApiResponse,
  SpellcheckSearchApiResponse,
} from './types';
import { BraveSDKOptionsSchema } from './schemas';

class BraveSDK {
  private apiKey: string;
  private baseUrl = 'https://api.search.brave.com/res/v1';

  constructor(options?: BraveSDKOptions) {
    const validatedOptions = BraveSDKOptionsSchema.parse(options);
    this.apiKey = validatedOptions.apiKey || process.env.BRAVE_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('API key is required. Please provide it in the constructor or set the BRAVE_API_KEY environment variable.');
    }
  }

  private async request<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, v.toString()));
      } else if (value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  async webSearch(params: WebSearchParams): Promise<WebSearchApiResponse> {
    return this.request<WebSearchApiResponse>('/web/search', params);
  }

  async localPoiSearch(params: LocalSearchParams): Promise<LocalPoiSearchApiResponse> {
    return this.request<LocalPoiSearchApiResponse>('/local/pois', params);
  }

  async localDescriptionsSearch(params: LocalSearchParams): Promise<LocalDescriptionsSearchApiResponse> {
    return this.request<LocalDescriptionsSearchApiResponse>('/local/descriptions', params);
  }

  async summarizerSearch(params: SummarizerSearchParams): Promise<SummarizerSearchApiResponse> {
    return this.request<SummarizerSearchApiResponse>('/summarizer/search', params);
  }

  async imageSearch(params: ImageSearchParams): Promise<ImageSearchApiResponse> {
    return this.request<ImageSearchApiResponse>('/images/search', params);
  }

  async videoSearch(params: VideoSearchParams): Promise<VideoSearchApiResponse> {
    return this.request<VideoSearchApiResponse>('/videos/search', params);
  }

  async newsSearch(params: NewsSearchParams): Promise<NewsSearchApiResponse> {
    return this.request<NewsSearchApiResponse>('/news/search', params);
  }

  async suggestSearch(params: SuggestSearchParams): Promise<SuggestSearchApiResponse> {
    return this.request<SuggestSearchApiResponse>('/suggest/search', params);
  }

  async spellcheckSearch(params: SpellcheckSearchParams): Promise<SpellcheckSearchApiResponse> {
    return this.request<SpellcheckSearchApiResponse>('/spellcheck/search', params);
  }
}

export function createBraveSDK(options?: BraveSDKOptions): BraveSDK {
  return new BraveSDK(options);
}
