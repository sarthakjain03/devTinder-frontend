import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axiosClient from "../axios/axiosClient";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  const [updateError, setUpdateError] = useState("");
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      setUpdateError("");
      const response = await axiosClient.patch(
        "/profile/edit",
        { name, age, gender, skills: skills?.split(", "), photoUrl, about },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.data));
    } catch (error) {
      console.error(error);
      setUpdateError(error?.response?.data || "Something went wrong");
    }
  };

  useEffect(() => {
    setName(user?.name);
    setPhotoUrl(user?.photoUrl);
    setAge(user?.age);
    setGender(user?.gender);
    setSkills(user?.skills?.join(", "));
    setAbout(user?.about);
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen pt-10 pb-32 gap-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div className="pt-4 pb-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="pb-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="pb-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="pb-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="pb-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="pb-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                className="input"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500 text-center pb-1 mt-0">{updateError}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={updateProfile}>
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard
        userDetails={{
          name,
          photoUrl,
          age,
          gender,
          skills: skills?.split(","),
          about,
        }}
        showActionButtons={false}
      />
    </div>
  );
};

export default Profile;
