import React, { useRef, useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, reset } from "../../features/books/bookSlice";

import "react-bootstrap-typeahead/css/Typeahead.css";
// import "./styles.css";

const WriterSelect = () => {
  const typeaheadRef = useRef(null);
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();

  const { books, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    if (isError) {
      console.log("error:", message);
    }
    dispatch(getAllBooks());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  return (
    <Typeahead
      multiple
      id="keep-menu-open"
      labelKey="writer"
      onChange={(selected) => {
        setSelected(selected);
        typeaheadRef.current.toggleMenu();
      }}
      options={books}
      placeholder="Choose a state..."
      ref={typeaheadRef}
      selected={selected}
    />
  );
};

export default WriterSelect;
