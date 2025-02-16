export interface Article {
  id: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: string;
  author?: string;
  category: string;
}

export interface NewsParams {
  keyword?: string;
  category?: string;
  source?: string;
  date?: string;
}
