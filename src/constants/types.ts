export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}

export interface Source {
    id: number;
    name: string;
}

export interface Filters {
    country: string;
}

export interface INews {
    disableCountrySelection(enable: boolean): void;
}

export type CategoriesType = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export type CategoryArticles = { [cat in CategoriesType ]?: Article[] };