import { useDispatch } from "react-redux";
import axiosClient from "../axios/axiosClient";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ userDetails, showActionButtons = true }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    try {
      const res = await axiosClient.post(
        `/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-200 w-96 shadow">
      <figure>
        <img src={userDetails?.photoUrl} alt="User Display Picture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{userDetails?.name}</h2>
        {userDetails?.age && userDetails?.gender && (
          <p>{userDetails?.age + ", " + userDetails?.gender}</p>
        )}
        <p>{userDetails?.about}</p>
        <div className="flex gap-4 flex-wrap">
          {userDetails?.skills?.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="bg-base-300 shadow-md rounded py-2 px-3 max-w-fit"
            >
              {skill}
            </div>
          ))}
        </div>
        {showActionButtons && (
          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", userDetails?._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", userDetails?._id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
