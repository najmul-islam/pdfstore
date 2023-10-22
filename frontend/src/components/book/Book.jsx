import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const Book = ({ book }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h4>Name: {book.name}</h4>
          <h5>Year: {book.year}</h5>
          <h6>Writer: {book.writer}</h6>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Book;

const BookCard = styled.div`
  background-color: #fff;
  height: 100px;
  margin-bottom: 15px;
  border-radius: 5px;
  display: flex;
`;
