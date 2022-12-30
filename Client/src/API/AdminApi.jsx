import axios from "axios";
import {
  AdminAllUsersListAction, AdminDeleteUserAction,
} from "../Redux/Slice";
import { ACCESS_TOKEN, base_Url } from "./ApiConfig";

export const adminUsersList = () => {
  return (dispatch) => {
    axios
      .get(base_Url + "/getallusers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(AdminAllUsersListAction(res?.data?.data));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};

export const adminDeleteUserApi = (_id) => {
  return (dispatch) => {
    axios
      .post(base_Url + `/deleteuser/${_id}`, {
        headers: {
          "Content-Type": "application/json",
           Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(AdminDeleteUserAction(res?.data?.data));
      })
      .catch((err) => {
        alert(err?.message)
      });
  };
};
