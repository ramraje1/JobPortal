import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  // let [user, setuser] = useState(false);
  let [open, setOpen] = useState(false);
  let { user } = useSelector((store) => store.auth);
  return (
    <>
      <div className="bg-white container-fluid">
        <div className="flex items-center justify-between  h-16">
          <a href="#">
            <div>
              <h1 className="text-2xl font-bold ps-5">
                Job<span className="text-orange-500">Portal</span>
              </h1>
            </div>
          </a>
          <div className="flex gap-12">
            <ul className="flex font-medium items-center gap-5">
              {user && user.role === "student" ? (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse">Browse</Link>
                  </li>
                  <li>
                    <Link to="/fav">Favourite</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/admin/companies">companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              )}
            </ul>
            {!user ? (
              <div className="d-flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn btn-outline-dark text-dark hover:bg-green-500">
                  logIn
                </Link>
                <Link
                  to="/signup"
                  className="btn bg-purple-500 text-white me-2 hover:btn-outline-primary hover:bg-purple-700">
                  signUp
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="curser-pointer">
                    <AvatarImage src={user.profile.profilePhoto} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-88">
                  <div className="flex items-center">
                    <Avatar className="curser-pointer">
                      <AvatarImage src={user.profile.profilePhoto} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="ps-2">
                      <h4>{user.FullName}</h4>
                      <p className="text-muted text-sm">{user.profile.bio}</p>
                    </div>
                  </div>
                  {user && user.role === "student" && (
                    <Link to="/profile">
                      <div className="d-flex align-items-center mt-2 ms-2 w-100">
                        <CgProfile />
                        <h3 className="ms-4">view profile</h3>
                      </div>
                    </Link>
                  )}

                  <Link to="/logout">
                    <div className="d-flex align-items-center mt-2 ms-2 w-fit">
                      <CiLogin />

                      <h3 className="ms-4">logout</h3>
                    </div>
                  </Link>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
// export default Navbar;
