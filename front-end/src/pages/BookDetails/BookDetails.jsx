import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './BookDetails.module.css';
import { updateBook } from '../../api/bookApi';
import { toast } from 'react-toastify';
import HandleError from '../../utils/HandleError';

const BookDetails = () => {
  const book = useLoaderData();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publishedDate, setPublishedDate] = useState(book.published_date);
  const navigate = useNavigate(); 
  const handleUpdate = async () => {
    const updatedBook = { title, author, published_date: publishedDate };
    try {
      await updateBook(book.id, updatedBook);
      toast.success('cập nhật thành công!')
    } catch (error) {
      HandleError(error)
    }
    navigate('/'); 
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
