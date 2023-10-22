import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import { Container, Form, Button } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Spinner from "../others/Spinner";

const Register = () => {
  const [passwordType, setPasswordType] = useState("password");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, messsage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(messsage);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, messsage, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      return setPasswordType("text");
    }
    setPasswordType("password");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Full Name"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={passwordType}
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
          />
          <Form.Text onClick={togglePassword}>
            {passwordType === "password" ? <BsEyeSlash /> : <BsEye />}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={onSubmit}>
          Sign up
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
