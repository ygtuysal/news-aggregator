import React, { useState, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Layout from '../components/Layout';
import ArticlesList from '../components/ArticleList';
import { useNewsQuery } from 'src/hooks/useNews';
import { useDebounce } from 'src/hooks/useDebounce';
import { CircularProgress, Box, Typography } from '@mui/material';

const MainLayout: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');

  const debouncedCategory = useDebounce(category, 500);
  const debouncedSource = useDebounce(source, 500);
  const debouncedDate = useDebounce(date, 500);

  const handleSetCategory = useCallback(
    (value: string) => setCategory(value),
    [],
  );
  const handleSetSource = useCallback((value: string) => setSource(value), []);
  const handleSetDate = useCallback((value: string) => setDate(value), []);

  const {
    data: articles = [],
    isLoading,
    error,
  } = useNewsQuery({
    keyword,
    category: debouncedCategory,
    source: debouncedSource,
    date: debouncedDate,
  });

  return (
    <Layout>
      <SearchBar value={keyword} onChange={setKeyword} />
      <Filters
        category={category}
        setCategory={handleSetCategory}
        source={source}
        setSource={handleSetSource}
        date={date}
        setDate={handleSetDate}
      />

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box display="flex" justifyContent="center" mt={4} color="red">
          <Typography>
            Error fetching articles. Please try again later.
          </Typography>
        </Box>
      )}

      {!isLoading && !error && articles.length === 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography color="text.secondary">No articles found.</Typography>
        </Box>
      )}

      {!isLoading && !error && articles.length > 0 && (
        <ArticlesList articles={articles} />
      )}
    </Layout>
  );
};

export default MainLayout;
