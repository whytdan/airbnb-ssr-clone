import axios from 'axios';

export const getCategoryTitle = async (slug) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?slug=${slug}`
  );
  return data[0].title;
};

export const fetchHomeCategories = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  return data;
};
