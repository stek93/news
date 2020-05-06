import axios from '../api/axios';
import { NewsResponse } from "../constants/types";

export const getTopNewsForCountry = (country: string) => {
    return axios.get<NewsResponse>(`/?country=${ country }`);
};

export const getTopNewsForAllCategories = (country: string, categories: string[], pageSize = 5) => {
    return Promise.all(categories.map(category => axios.get<NewsResponse>(`/?country=${ country }&pageSize=${ pageSize }&category=${ category }`)));
};

export const getNewsForSpecificKeywords = (country: string, keyword: string) => {
    return axios.get<NewsResponse>(`/?country=${ country }&q=${ keyword }`);
};

export const getNewsForSpecificCategory = (country: string, category: string) => {
    return axios.get<NewsResponse>(`/?country=${ country }&category=${ category }`);
};