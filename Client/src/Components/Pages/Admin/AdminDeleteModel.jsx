import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { AdminDeleteUserSelector } from "../../../Redux/Slice";
import { adminDeleteUserApi, adminUsersList } from "../../../API/AdminApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteUser(props) {
  const dispatch = useDispatch();
  const { handleModel, opemModel, id } = props;
  const { DeleteUser, isLoading, error } = useSelector(
    AdminDeleteUserSelector
  );

  useEffect(() => {
    if (DeleteUser?.status === 200) {
      handleModel();
      dispatch(adminUsersList());
    }
  }, [DeleteUser]);
  console.log("DeleteUser?.status", id);
  const userDelete = async () => {
    let _id = id?._id;
    await dispatch(adminDeleteUserApi(_id));
  };
  return (
    <div>
      <Dialog
        open={opemModel}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Delete User Account`}</DialogTitle>
        <DialogContent>
          '''''''''''''' Delete {id?.name} ?''''''''''
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModel}>Cancel</Button>
          <Button onClick={userDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
