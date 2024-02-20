import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: 'https://api-rede-social-vtvz.onrender.com/api/v1/',
});

export const getAccessTokenHeader = (): { headers: { Authorization: string } } => {
  return {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`,
    },
  };
};