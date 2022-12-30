import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { RegisterApi } from "../../API/AuthApi";
import {useNavigate} from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email().required("Email is required"),
      number: yup
        .string()
        .required("Mobile Number is required")
        .min(10, "should be 10 digits")
        .max(10, "10 digits required"),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: async (data) => {
      // setLoading(true);
      let value = {
        name: data.name,
        email: data.email,
        number: data.number,
        password: data.password,
        role: "admin",
      };
      await RegisterApi(value, navigate)   
    },
  });

  return (
    <Card
      sx={{
        display: "flex",
        width: "60%",
        margin: "auto",
        marginTop: "5%",
        boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px ",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", width: "50%" }}>
        <CardContent sx={{ display: "grid", margin: "auto" }}>
          <form style={{display:'contents'}}>
            <Typography variant="h4"> Create Account </Typography>
            <TextField
              sx={{ mt: 1 }}
              label="Name"
              name="name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={formik.touched.name ? formik.errors.name : null}
              error={formik.touched.name ? formik.errors.name : null}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Email"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.touched.email ? formik.errors.email : null}
              error={formik.touched.email ? formik.errors.email : null}
            />

            <TextField
              sx={{ mt: 1 }}
              type="number"
              name="number"
              InputProps={{ inputProps: { min: 0 } }}
              placeholder="Mobile Number"
              value={formik.values.number}
              onChange={formik.handleChange}
              helperText={formik.touched.number ? formik.errors.number : null}
              error={formik.touched.number ? formik.errors.number : null}
            />
            <FormControl sx={{ mt: 1 }} variant="outlined">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password ? formik.errors.password : null}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText error>
                {formik.touched.password ? formik.errors.password : null}
              </FormHelperText>
            </FormControl>
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              size="large"
              onClick={formik.handleSubmit}
            >
              SignUp
            </Button>
            <Typography sx={{ mt: 2 }}>
              Already have account <Link to="/">Login</Link>
            </Typography>
          </form>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "50%" }}
        image="/images.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
