import axios from 'axios';
import CONFIG from '../dev.config.json';

export const fetchHomesByCategory = async (query) => {
  const apiQuery = `${CONFIG.API_URL}/homes?_limit=5&categories_like=${query.slug}`;

  try {
    const { data } = await axios.get(apiQuery, {
      params: {
        ...query,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
