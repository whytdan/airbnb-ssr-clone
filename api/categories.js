import axios from 'axios';
import CONFIG from '../dev.config.json';

export const getCategoryTitle = async (slug) => {
  const { data } = await axios.get(`${CONFIG.API_URL}/categories?slug=${slug}`);
  return data[0].title;
};

export const fetchHomeCategories = async () => {
  const { data } = await axios.get(`${CONFIG.API_URL}/categories`);
  return data;
};
