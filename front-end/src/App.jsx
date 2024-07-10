import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/Home/Home';
import FormAddBook from './pages/FormAddBook/FormAddBook';
import BookDetails from './pages/BookDetails/BookDetails';
import { getBookById, getBooks } from './api/bookApi';
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: async () => {
                    const books = await getBooks();
                    console.log(books);
                    return books;
                },
            },
            {
                path: '/books/:id',
                element: <BookDetails />,
                loader: async ({ params }) => {
                    const book = await getBookById(params.id);
                    console.log(book);
                    return book;
                },
            },
            { path: '/add-new-book', element: <FormAddBook /> },
        ],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
