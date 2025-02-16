import React from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '../types/types';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';

interface PersonalizedFeedProps {
  articles: Article[];
  preferences: {
    sources: string[];
    categories: string[];
    authors: string[];
  };
}

const PersonalizedFeed: React.FC<PersonalizedFeedProps> = ({
  articles,
  preferences,
}) => {
  const filteredArticles = articles.filter((article) => {
    const matchesSource =
      preferences.sources.length === 0 ||
      preferences.sources.includes(article.source);
    const matchesCategory =
      preferences.categories.length === 0 ||
      preferences.categories.includes(article.category);
    const matchesAuthor =
      preferences.authors.length === 0 ||
      (article.author && preferences.authors.includes(article.author));

    return matchesSource && matchesCategory && matchesAuthor;
  });

  return (
    <Box>
      {filteredArticles.length === 0 ? (
        <Typography textAlign="center" mt={4} color="text.secondary">
          No articles match your preferences.
        </Typography>
      ) : (
        <Grid2 container spacing={2}>
          {filteredArticles.map((article, index) => (
            <Grid2 xs={12} sm={6} md={4} key={index}>
              <ArticleCard article={article} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default PersonalizedFeed;
