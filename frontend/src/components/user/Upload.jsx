import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, reset, createBook } from "../../features/books/bookSlice";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./upload.css";

const Upload = () => {
  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const [year, setYear] = useState("");
  const [writer, setWriter] = useState("");
  const typeaheadRef = useRef(null);
  const [selected, setSelected] = useState([]);

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

  const onChange = (e) => {
    e.preventDefault();
    setBook(e.target.files[0]);

    if (e.target.files.length > 0) {
      const file = e.target.files[0].name;
      const fileExt = file.split(".").pop();
      const fileName = file
        .replace("." + fileExt, "")
        .split(/[ .:;?!~,_`"&|()<>{}[\]\r\n/\\]+/)
        .join(" ");
      setName(fileName);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updateSelected = selected.map((select) => select.writer).join(", ");
    setWriter(updateSelected);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("book", book);
    formData.append("year", year);
    formData.append("writer", writer);

    console.log("formdata", formData);

    dispatch(createBook({ formData }));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form encType="multipart/form-data" method="POST">
            <Form.Group className="mb-3" controlId="book">
              <Form.Label>Choose File</Form.Label>
              <Form.Control
                type="file"
                name="book"
                id="book"
                onChange={onChange}
              />

              {/* <input type="file" name="book" id="book" onChange={onChange} /> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Year"
              />
            </Form.Group>

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
            <Button variant="primary" type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Upload;
