import { z } from 'zod';

export const BraveSDKOptionsSchema = z.object({
  apiKey: z.string().optional(),
}).describe('Options for initializing the Brave SDK');

export const WebSearchParamsSchema = z.object({
  q: z.string().max(400).describe('Search query (max 400 characters, 50 words)'),
  country: z.string().length(2).optional().describe('2-letter country code'),
  search_lang: z.string().optional().describe('Search language'),
  ui_lang: z.string().optional().describe('UI language'),
  count: z.number().min(1).max(20).optional().describe('Number of results (max 20)'),
  offset: z.number().min(0).max(9).optional().describe('Offset for pagination (max 9)'),
  safesearch: z.enum(['off', 'moderate', 'strict']).optional(),
  freshness: z.union([z.enum(['pd', 'pw', 'pm', 'py']), z.string()]).optional(),
  text_decorations: z.boolean().optional().describe('Include decoration markers'),
  spellcheck: z.boolean().optional().describe('Enable spellchecking'),
  result_filter: z.string().optional().describe('Comma-separated list of result types'),
  goggles: z.array(z.string()).optional().describe('Goggle definitions'),
  units: z.enum(['metric', 'imperial']).optional(),
  extra_snippets: z.boolean().optional().describe('Include extra snippets'),
  summary: z.boolean().optional().describe('Enable summary key generation'),
}).describe('Parameters for web search');

export const LocalSearchParamsSchema = z.object({
  ids: z.array(z.string()).max(20).describe('List of location IDs (max 20)'),
  search_lang: z.string().optional().describe('Search language'),
  ui_lang: z.string().optional().describe('UI language'),
  units: z.enum(['metric', 'imperial']).optional(),
}).describe('Parameters for local search');

export const SummarizerSearchParamsSchema = z.object({
  key: z.string().describe('The summarizer key obtained from a prior web search'),
  entity_info: z.boolean().optional().describe('Include entity information'),
}).describe('Parameters for summarizer search');

export const ImageSearchParamsSchema = WebSearchParamsSchema.omit({ summary: true, extra_snippets: true })
  .describe('Parameters for image search');

export const VideoSearchParamsSchema = WebSearchParamsSchema.omit({ summary: true, extra_snippets: true })
  .describe('Parameters for video search');

export const NewsSearchParamsSchema = WebSearchParamsSchema.omit({ summary: true, extra_snippets: true })
  .describe('Parameters for news search');

export const SuggestSearchParamsSchema = z.object({
  q: z.string().describe('Search query'),
  country: z.string().optional().describe('2-letter country code'),
  count: z.number().optional().describe('Number of suggestions'),
}).describe('Parameters for suggest search');

export const SpellcheckSearchParamsSchema = z.object({
  q: z.string().describe('Search query'),
  country: z.string().optional().describe('2-letter country code'),
}).describe('Parameters for spellcheck search');
