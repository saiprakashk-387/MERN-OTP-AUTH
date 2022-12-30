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
import { json, Link, useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useFormik } from "formik";
import * as yup from "yup";
import { getOtpApi, loginWithEmail, loginWithOtpApi } from "../../API/AuthApi";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("EMAIL");
  const [otpStatus, setOtpStatus] = useState(false);
  const [otp, setOtp] = useState();
  const [number, setNumber] = useState();

  const handleChange = (event, newValue) => {
    console.log("handleChange", newValue);
    setValue(newValue);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleOtpValue = (e) => {
    setOtp(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const getOtp = async () => {
    let value = {
      number: number,
    };
    await getOtpApi(value).then((res) => setOtpStatus(true));
  };

  const loginWithOtp = async () => {
    let userNumber = await JSON.parse(sessionStorage.getItem("number"));
    let values = await {
      number: userNumber.number,
      otp: otp,
    };
    await loginWithOtpApi(values, navigate);
    // console.log("withotp", values.number);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "6 characters required"),
    }),
    onSubmit: async (data) => {
      // setLoading(true)
      let value = {
        email: data.email,
        password: data.password,
      };
      console.log("value", value);
      await loginWithEmail(value, navigate);
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
          <form style={{ display: "contents" }}>
            <Typography variant="h3"> Welcome Back </Typography>
            <TabContext value={value}>
              <Box sx={{ margin: "auto" }}>
                <TabList onChange={handleChange}>
                  <Tab label="Email" value="EMAIL" />
                  <Tab label="Mobile Number" value="NUMBER" />
                </TabList>
              </Box>
              <TabPanel value="EMAIL" sx={{ display: "grid" }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email ? formik.errors.email : null}
                  error={formik.touched.email ? formik.errors.email : null}
                />
                <FormControl sx={{ mt: 3 }} variant="outlined">
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password ? formik.errors.password : null
                    }
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
                  Login
                </Button>
              </TabPanel>
              <TabPanel value="NUMBER">
                {!otpStatus ? (
                  <Box sx={{ display: "grid" }}>
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      name="mobileNumber"
                      onChange={(e) => handleNumber(e)}
                      placeholder="Mobile Number"
                    />
                    <Button
                      sx={{ mt: 3 }}
                      variant="contained"
                      size="large"
                      onClick={getOtp}
                    >
                      Send OTP
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "grid" }}>
                    <TextField
                      sx={{ mt: 3 }}
                      // type="number"
                      onChange={(e) => {
                        handleOtpValue(e);
                      }}
                      InputProps={{ inputProps: { min: 0 } }}
                      name="otp"
                      placeholder="OTP"
                    />
                    <Button
                      sx={{ mt: 3 }}
                      variant="contained"
                      size="large"
                      onClick={loginWithOtp}
                    >
                      Login
                    </Button>
                  </Box>
                )}
              </TabPanel>
              <Typography sx={{ mt: 2 }}>
                Yet to have account <Link to="/register">Register</Link>
              </Typography>
            </TabContext>
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

// {
//   /* <TextField sx={{ mt: 3 }} label="Email" variant="outlined" />

//           <TextField
//             sx={{ mt: 3 }}
//             type="number"
//             InputProps={{ inputProps: { min: 0 } }}
//             name="mobileNumber"
//             placeholder="Mobile Number"
//           />
//           <FormControl sx={{ mt: 3 }} variant="outlined">
//             <InputLabel>Password</InputLabel>
//             <OutlinedInput
//               type={showPassword ? "text" : "password"}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Password"
//             />
//           </FormControl> */
// }
