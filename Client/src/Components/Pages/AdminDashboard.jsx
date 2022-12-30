import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
//  import { parseDate } from "../../Constants";
import { Button, Typography } from "@mui/material";
// import DeleteUser from "./DeleteUser";
// import Listmodel from "./Listmodel";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { adminUsersList } from "../../API/AdminApi";
import { AdminAllUsersListSelector } from "../../Redux/Slice";
import DeleteUser from "./Admin/AdminDeleteModel";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [opemModel, setOpenModel] = useState(false);
  const [openlistModel, setOpenListModel] = useState(false);
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const { AllUsersList, isLoading } = useSelector(AdminAllUsersListSelector);

  useEffect(() => {
    dispatch(adminUsersList());
  }, []);
  const dleteUser = (val) => {
    setOpenModel(true);
    setId(val);
  };
  const handleModel = () => {
    setOpenModel(false);
  };
  const viewUsersList = (val) => {
    setOpenListModel(true);
    setEmail(val.email);
  };
  const handleListModel = () => {
    setOpenListModel(false);
  };
  console.log("AllUsersList", AllUsersList);
  return (
    <>
      <TableContainer component={Paper}>
        <Typography sx={{ color: "#10e09a" }}>All Users</Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "gainsboro" }}>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {AllUsersList?.length >= 1 && (
            <TableBody>
              {AllUsersList?.map((val, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope="row">{index + 1}</TableCell>
                    <TableCell scope="row">{val.name}</TableCell>
                    <TableCell>{val.email}</TableCell>
                    <TableCell scope="row">
                      {val.number === null ? "Update Profile" : val.number}
                    </TableCell>
                    <TableCell>{val.role}</TableCell>

                    {/* {val.role === "admin" ? (
                      <TableCell>
                        <Button disabled>
                          <PersonRemoveOutlinedIcon />
                        </Button>
                      </TableCell>
                    ) : ( */}
                      <TableCell>
                        <Button
                          onClick={() => {
                            dleteUser(val);
                          }}
                        >
                          <PersonRemoveOutlinedIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            viewUsersList(val);
                          }}
                        >
                          <RemoveRedEyeOutlinedIcon />
                        </Button>
                      </TableCell>
                    {/* )} */}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <DeleteUser id={id} opemModel={opemModel} handleModel={handleModel} />
    </>
  );
}
