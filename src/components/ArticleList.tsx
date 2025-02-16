import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '../types/types';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Pagination, Box } from '@mui/material';

interface ArticlesListProps {
  articles: Article[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  const [page, setPage] = useState(1);
  const articlesPerPage = 9;
  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const displayedArticles = articles.slice(startIndex, endIndex);

  return (
    <Box>
      <Grid2 container spacing={2}>
        {displayedArticles.map((article, index) => (
          <Grid2 xs={12} sm={6} md={4} key={index}>
            <ArticleCard article={article} />
          </Grid2>
        ))}
      </Grid2>
      {articles.length > articlesPerPage && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(articles.length / articlesPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ArticlesList;
