import React from 'react';
import { TextField, Box } from '@mui/material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Box my={2}>
      <TextField
        fullWidth
        label="Search News"
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
