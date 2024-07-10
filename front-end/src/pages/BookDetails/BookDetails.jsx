import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import styles from './BookDetails.module.css';
import { updateBook } from '../../api/bookApi';

const BookDetails = () => {
  const book = useLoaderData();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publishedDate, setPublishedDate] = useState(book.published_date);

  const handleUpdate = async () => {
    const updatedBook = { title, author, published_date: publishedDate };
    updateBook(book.id, updatedBook);

  };

  return (
    <div className={styles.container}>
      <h1>Edit Book</h1>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <div>
          <label>Published Date:</label>
          <input
            type="text"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <button type="button" onClick={handleUpdate} className={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default BookDetails;
