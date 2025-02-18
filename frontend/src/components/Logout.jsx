import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { setUser } from "../../redux/authslice";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function Logout() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [open, setOpen] = useState(false);
  let logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/login");
  };
  let clogOut = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Button onClick={() => setOpen(true)}>LogOut</Button>
        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => clogOut()}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => logout()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
