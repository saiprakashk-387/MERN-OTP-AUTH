import axios from "axios";
import { base_Url } from "./ApiConfig";

export const RegisterApi = (values, navigate) => {
  axios
    .post(base_Url + "/register", values)
    .then((res) => {
      if (res.status === 200) {
        alert("Registration Successfull");
        navigate("/");
      }
    })
    .catch((err) => {
      alert(err.response.data);
    });
};
export const loginWithEmail = async (values, navigate) => {
  await axios
    .post(base_Url + "/login", values)
    .then((res) => {
      if (res.status === 200) {
        sessionStorage.setItem("userInfo", JSON.stringify(res?.data?.data));
        sessionStorage.setItem("role", (res?.data?.data?.role));
        sessionStorage.setItem("userToken", res?.data?.token);
        alert(res?.data?.message);             
      }
      if(res.data.data.role === 'admin'){
        navigate("/dashboard");
    }else{
      navigate("/home");
    }   
    })
    .catch((err) => {
      console.log("errr", err);
      alert("erorr");
    });
};

export const getOtpApi = async (values) => {
  await axios
    .post(base_Url + "/sendotp", values)
    .then((res) => {
      if (res.status === 200) {
        sessionStorage.setItem("number", JSON.stringify(values));
        alert(res.data.message);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};
export const loginWithOtpApi = async (values, navigate) => {
  await axios
    .post(base_Url + "/verifyotp", values)
    .then((res) => {
      if (res.status === 200) {
        alert(res?.data?.message);
        sessionStorage.setItem("userinfo", JSON.stringify(res?.data?.data));
        sessionStorage.setItem("userToken", res?.data?.token);
        navigate("/home");
        sessionStorage.removeItem("number");
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

