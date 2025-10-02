import axios from 'axios';
import qs from 'qs';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const apiToken = process.env.STRAPI_API_TOKEN;

// Create axios instance for Strapi API
export const strapiApi = axios.create({
  baseURL: `${strapiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(apiToken && { Authorization: `Bearer ${apiToken}` }),
  },
});

// Strapi API response type
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Individual Strapi entity type
export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

// Helper function to build query parameters
export const buildQuery = (params: Record<string, any>) => {
  return qs.stringify(params, { encodeValuesOnly: true });
};

// Generic API functions
export const strapiGet = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<StrapiResponse<StrapiEntity<T>[]>> => {
  const queryString = params ? `?${buildQuery(params)}` : '';
  const response = await strapiApi.get(`${endpoint}${queryString}`);
  return response.data;
};

export const strapiGetOne = async <T>(
  endpoint: string,
  id: string | number,
  params?: Record<string, any>
): Promise<StrapiResponse<StrapiEntity<T>>> => {
  const queryString = params ? `?${buildQuery(params)}` : '';
  const response = await strapiApi.get(`${endpoint}/${id}${queryString}`);
  return response.data;
};

export const strapiPost = async <T>(
  endpoint: string,
  data: any
): Promise<StrapiResponse<StrapiEntity<T>>> => {
  const response = await strapiApi.post(endpoint, { data });
  return response.data;
};

export const strapiPut = async <T>(
  endpoint: string,
  id: string | number,
  data: any
): Promise<StrapiResponse<StrapiEntity<T>>> => {
  const response = await strapiApi.put(`${endpoint}/${id}`, { data });
  return response.data;
};

export const strapiDelete = async (
  endpoint: string,
  id: string | number
): Promise<void> => {
  await strapiApi.delete(`${endpoint}/${id}`);
};
