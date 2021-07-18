import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchCategoryHomes(
  slug,
  pageNumber,
  preloadedHomes
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [homes, setHomes] = useState(preloadedHomes);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const sendQuery = async () => {
      try {
        await setLoading(true);
        await setError(false);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/homes?_page=${pageNumber}&_limit=${process.env.NEXT_PUBLIC_LIMIT}&categories_like=${slug}`
        );
        await setHomes((prev) => [...prev, ...res.data]);
        await setHasMore(res.data.length > 0);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    if (pageNumber === 1) return;
    sendQuery();
  }, [slug, pageNumber]);

  return { loading, error, homes, hasMore };
}
