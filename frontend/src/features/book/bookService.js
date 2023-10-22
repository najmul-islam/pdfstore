import axios from "axios";

const API_URL = "/api/books/";

// get all books
const getAllBooks = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// create new book
const createBook = async (bookData, token) => {
  console.log("bookData: ", bookData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data`,
    },
  };

  const response = await axios.post(API_URL, bookData, config);

  return response.data;
};

// delete user book
const deleteBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + bookId, config);
  return response.data;
};

const bookService = {
  getAllBooks,
  createBook,
  deleteBook,
};

export default bookService;
