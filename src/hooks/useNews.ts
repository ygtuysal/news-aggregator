import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Article } from '../types/types';

interface NewsParams {
  keyword?: string;
  category?: string;
  source?: string;
  date?: string;
  preferences?: {
    sources: string[];
    categories: string[];
    authors: string[];
  };
}

const normalizeArticle = (rawArticle: any, source: string): Article => ({
  id: rawArticle.url || rawArticle.uri || rawArticle.id,
  title: rawArticle.title || rawArticle.webTitle || 'No Title',
  description:
    rawArticle.description || rawArticle.fields?.body || 'No Description',
  url: rawArticle.url || rawArticle.webUrl || '',
  source: source,
  publishedAt: rawArticle.publishedAt || rawArticle.webPublicationDate || '',
  author: rawArticle.author || rawArticle.fields?.byline || 'Unknown',
  category: rawArticle.sectionName || rawArticle.section || 'General',
  urlToImage: rawArticle.urlToImage || rawArticle.fields?.thumbnail || '',
});
const fetchFromAPI = async (
  url: string,
  params: Record<string, any>,
  source: string,
) => {
  const response = await axios.get(url, { params });
  return response.data.articles
    ? response.data.articles.map((article: any) =>
        normalizeArticle(article, source),
      )
    : response.data.response?.results.map((article: any) =>
        normalizeArticle(article, source),
      ) || [];
};
const newsAPIFetcher = (params: NewsParams) =>
  fetchFromAPI(
    'https://newsapi.org/v2/top-headlines',
    {
      q: params.keyword,
      from: params.date,
      category:
        params.category && params.category !== 'all'
          ? params.category
          : undefined,
      sources: params.source,
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
      pageSize: 50,
    },
    'NewsAPI',
  );

const guardianFetcher = (params: NewsParams) => {
  const today = new Date().toISOString().split('T')[0];

  const apiParams: Record<string, any> = {
    q: params.keyword,
    'from-date': params.date || today,
    'api-key': process.env.REACT_APP_GUARDIAN_API_KEY,
    'show-fields': 'body,thumbnail,byline',
  };

  if (params.category) {
    apiParams.section = params.category;
  }

  return fetchFromAPI(
    'https://content.guardianapis.com/search',
    apiParams,
    'The Guardian',
  );
};

const nyTimesFetcher = (params: NewsParams) => {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');

  return fetchFromAPI(
    'https://api.nytimes.com/svc/search/v2/articlesearch.json',
    {
      q: params.keyword,
      fq: params.category ? `section_name:"${params.category}"` : undefined,
      begin_date: params.date ? params.date.replace(/-/g, '') : today,
      'api-key': process.env.REACT_APP_NYTIMES_API_KEY,
    },
    'New York Times',
  );
};

const fetchNews = async (params: NewsParams): Promise<Article[]> => {
  try {
    const fetchers: Promise<Article[]>[] = [
      params.source === 'newsapi' || !params.source
        ? newsAPIFetcher(params)
        : Promise.resolve([]),
      params.source === 'guardian' || !params.source
        ? guardianFetcher(params)
        : Promise.resolve([]),
      params.source === 'nytimes' || !params.source
        ? nyTimesFetcher(params)
        : Promise.resolve([]),
    ];

    const results = await Promise.allSettled(fetchers);
    return results.flatMap((result) =>
      result.status === 'fulfilled' ? result.value : [],
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const useNewsQuery = (params: NewsParams) => {
  return useQuery<Article[], Error>({
    queryKey: ['news', params],
    queryFn: () => fetchNews(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
};
