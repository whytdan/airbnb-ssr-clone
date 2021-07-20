import axios from 'axios';
import CONFIG from '../dev.config.json';

export const fetchHomesByCategory = async (slug) => {
  const query = `${CONFIG.API_URL}/homes?_limit=5&categories_like=${slug}`;
  try {
    const { data } = await axios.get(query);
    return data;
  } catch (error) {
    return error;
  }
};
