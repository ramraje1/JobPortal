import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useState } from "react";
import AppliedJobTable from "./AppliedJobTable";
import { Button } from "./ui/button";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";

export default function Profile() {
  let [isResume, setResume] = useState(true);
  let [open, setopen] = useState(false);
  let { user } = useSelector((store) => store.auth);

  return (
    <>
      <div className=" max-w-3xl min-w-fit border border-gray-800 mx-auto">
        <div className="flex items-center text-start justify-between ">
          <div className="flex items-center">
            <Avatar className=" flex items-center mx-4 p-2">
              <AvatarImage
                className="h-20 w-32  rounded-md"
                src={user.profile.profilePhoto || "avatar.jpg"}></AvatarImage>
            </Avatar>

            <div className="">
              <h1 className="font-semibold ">{user.FullName}</h1>
              <span className="text-sm ">{user.profile.bio}</span>
            </div>
          </div>
          <div className="">
            <Button
              onClick={() => setopen(true)}
              className=""
              variant="outline">
              <Pen className="ms-4" />
            </Button>
          </div>
        </div>
        <div className="my-3">
          <div className="flex items-center gap-3 ms-4 pb-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 ms-4">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className="ms-4 my-6">
          <h1 className="text-lg font-semibold">skills :</h1>
          {user.profile.skills.length !== 0 ? (
            user.profile.skills.map((item, i) => (
              <Badge className="">{item}</Badge>
            ))
          ) : (
            <span className="text-lg">NA</span>
          )}
        </div>
        <div className="grid w-full max-w-sm items-senter gap-2 ms-4 my-6 ">
          <Label className="text-lg font-semibold">Resume :</Label>
          {user.profile.resume ? (
            <a
              className="text-blue-500 w-full hover:underline"
              href={user.profile.resume}>
              Ram resume
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-md text-center my-12">
        <h1 className="my-4 text-xl font-bold text-orange-600">Applied job</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfile open={open} setopen={setopen} />
    </>
  );
}
