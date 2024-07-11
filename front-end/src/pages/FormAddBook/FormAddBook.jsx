import { useState } from 'react';
import {useNavigate} from 'react-router-dom'; 
import { createBook } from '../../api/bookApi';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import HandleError from '../../utils/HandleError';

const FormAddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const publishedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const newBook = { title, author, published_date: publishedDate };
    try {
      await createBook(newBook);   
      toast.success('thêm thành công')
    } catch (error) {
      HandleError(error)
      // toast.error(error.response.data.errors[0].msg)
    }
    navigate('/')
    // điều hướng về trang home
    
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Form Add Book
        </Typography>
        <TextField
          fullWidth
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          id="author"
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <TextField
            select
            label="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            sx={{ width: '30%' }}
          >
            {days.map((d) => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            sx={{ width: '30%' }}
          >
            {months.map((m) => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            sx={{ width: '30%' }}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Add Book
        </Button>
      </Box>
    </Container>
  );
};

export default FormAddBook;
