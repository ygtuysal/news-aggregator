import React, { useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

interface FiltersProps {
  category: string;
  setCategory: (category: string) => void;
  source: string;
  setSource: (source: string) => void;
  date: string;
  setDate: (date: string) => void;
}

const getTodayDate = (): string => new Date().toISOString().split('T')[0];

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'business', label: 'Business' },
  { value: 'technology', label: 'Technology' },
  { value: 'sports', label: 'Sports' },
  { value: 'health', label: 'Health' },
  { value: 'science', label: 'Science' },
  { value: 'entertainment', label: 'Entertainment' },
];

const sourceOptions = [
  { value: '', label: 'All Sources' },
  { value: 'newsapi', label: 'NewsAPI' },
  { value: 'nytimes', label: 'New York Times' },
  { value: 'guardian', label: 'The Guardian US' },
];

const FilterSelect: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      displayEmpty
      renderValue={(selected) =>
        selected
          ? options.find((option) => option.value === selected)?.label
          : label
      }
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const Filters: React.FC<FiltersProps> = ({
  category,
  setCategory,
  source,
  setSource,
  date,
  setDate,
}) => {
  useEffect(() => {
    if (!date) {
      setDate(getTodayDate());
    }
  }, [date, setDate]);

  return (
    <Box display="flex" gap={2} mb={4} sx={{ margin: '0 auto' }}>
      <FilterSelect
        label="Category"
        value={category}
        onChange={setCategory}
        options={categoryOptions}
      />
      <FilterSelect
        label="Source"
        value={source}
        onChange={setSource}
        options={sourceOptions}
      />
      <TextField
        fullWidth
        label="Date"
        type="date"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </Box>
  );
};

export default Filters;
