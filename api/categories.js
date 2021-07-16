import axios from 'axios';

export const getAllCategorySlugs = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  return data.map((category) => ({
    params: {
      slug: category.slug,
    },
  }));
};

export const getCategoryTitle = async (slug) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?slug=${slug}`
  );
  return data[0].title;
};
