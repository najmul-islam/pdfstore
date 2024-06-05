import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useRegisterMutation } from "../../features/auth/authApi";
import * as Yup from "yup";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  LoginOutlined,
} from "@mui/icons-material";
const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const [register, { isLoading, isError, isSuccess, error }] =
    useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  // show password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // formik implimentation
  const formik = useFormik({
    // initial value
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    // validation schema
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),

    // submit method
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        setStatus({ success: false });
        setSubmitting(false);
        register(values);
      } catch (error) {
        setStatus({ success: false });
        setErrors({ submit: error.message });
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(<Typography>{error?.data?.message}</Typography>);
      console.log(error);
    }

    if (isSuccess || user) {
      navigate("/");
      if (isSuccess && user) {
        toast.success("Login successfully");
      }
    }
  }, [user, isSuccess, isError, error, navigate]);

  return (
    <Box padding={5}>
      <Typography
        variant="h4"
        marginBottom={2}
        fontWeight="bold"
        sx={{ textAlign: "center" }}
      >
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <Stack direction="column" spacing={2}>
          {/* name */}
          <Box>
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              fullWidth
              id="name"
              type="name"
              name="name"
              placeholder="Full name"
              sx={{ height: "45px" }}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.email && formik.errors.email)}
            />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText error>{formik.errors.name}</FormHelperText>
            )}
          </Box>
          {/* email */}
          <Box>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <OutlinedInput
              fullWidth
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              sx={{ height: "45px" }}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.email && formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            )}
          </Box>

          {/* password */}
          <Box>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              name="password"
              placeholder="Password"
              sx={{ height: "45px" }}
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={formik.handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.password && formik.errors.password && (
              <FormHelperText error>{formik.errors.password}</FormHelperText>
            )}
          </Box>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          py={2}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
                size="small"
              />
            }
            label={<Typography variant="body2">Remember me</Typography>}
          />

          <Button
            disableElevation
            disabled={isLoading}
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<LoginOutlined />}
          >
            {isLoading ? <CircularProgress size={25} /> : " Create account"}
          </Button>
        </Stack>

        <Stack direction="row" justifyContent="center" py={2}>
          <Button
            disableElevation
            disabled={isLoading}
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
