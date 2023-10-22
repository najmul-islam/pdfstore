import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, reset } from "../../features/books/bookSlice";
import Book from "./Book";
import Spinner from "../others/Spinner";

const Books = () => {
  const dispatch = useDispatch();

  const { books, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllBooks());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      {books.length > 0 ? (
        <div>
          {books.map((book) => (
            <Book key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <h3>You have not set any Books</h3>
      )}
    </section>
  );
};

export default Books;
