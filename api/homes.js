import axios from 'axios';

export const fetchHomesByCategory = async (slug) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/homes?categories_like=${slug}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
