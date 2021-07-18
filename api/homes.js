import axios from 'axios';

export const fetchHomesByCategory = async (slug) => {
  const query = `${process.env.NEXT_PUBLIC_API_URL}/homes?_limit=${process.env.NEXT_PUBLIC_LIMIT}&categories_like=${slug}`;
  try {
    const { data } = await axios.get(query);
    return data;
  } catch (error) {
    return error;
  }
};
