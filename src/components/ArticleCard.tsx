import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';
import { Article } from '../types/types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 1, height: '400px' }}>
      <CardActionArea onClick={() => window.open(article.url, '_blank')}>
        {article.urlToImage && (
          <CardMedia
            component="img"
            height="140"
            image={article.urlToImage}
            alt={article.title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;
