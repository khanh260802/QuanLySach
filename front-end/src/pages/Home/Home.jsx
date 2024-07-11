import {useState} from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { deleteBook } from '../../api/bookApi';
import styles from './Home.module.css'; // Import CSS module
import { toast } from 'react-toastify';
import HandleError from '../../utils/HandleError';

const Home = () => {
  // const books = useLoaderData();
  const [books, setBooks] = useState(useLoaderData());
  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      toast.success('Xoá thành công!')
    } catch (error) {
      HandleError(error)
    }
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <Container className={styles.homeContainer}>
      <Typography variant="h2" component="h1" gutterBottom>
        List Books
      </Typography>
      <Grid container spacing={3} className={styles.bookGrid}>
        {books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card className={styles.bookItem}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <Link to={`/books/${book.id}`} className={styles.bookLink}>{book.title}</Link>
                </Typography>
                <Typography color="textSecondary">
                  Author: {book.author}
                </Typography>
                <Typography color="textSecondary">
                  Published Date: {book.published_date}
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(book.id)} className={styles.deleteButton}>
                  Delete
                </Button>
                <Link to={`/books/${book.id}`}>
                  <Button variant="contained" color="primary" className={styles.updateButton}>
                    Update
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
