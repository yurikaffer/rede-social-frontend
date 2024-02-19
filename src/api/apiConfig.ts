import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: 'https://api-rede-social-green.vercel.app/api/v1/',
});

export const getAccessTokenHeader = (): { headers: { Authorization: string } } => {
  return {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`,
    },
  };
};