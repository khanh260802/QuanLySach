import axiosClient from "./axiosClient";
export const getBooks = async () => {
    const response = await axiosClient.get('/books');
    return response; 
}

export const getBookById = async (id) => {
    const response = await axiosClient.get(`/books/${id}`);
    return response; 
}

export const createBook = async (book) => {
    const response = await axiosClient.post('/books', book);
    return response; 
}

export const updateBook = async (id, book) => {
    const response = await axiosClient.put(`/books/${id}`, book);
    return response; 
}

export const deleteBook = async (id) => {
    const response = await axiosClient.delete(`/books/${id}`);
    return response; 
}