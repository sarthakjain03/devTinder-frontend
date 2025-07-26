import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../axios/axiosClient";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const { user, requests } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const response = await axiosClient.get("/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(response?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      const res = await axiosClient.post(
        `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  if (!requests) return;

  if (requests?.length === 0) {
    return (
      <div className="flex justify-center my-10 min-h-screen mx-auto">
        <h1 className="font-bold text-3xl">No Connection Requests Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col gap-10 my-10 min-h-screen mx-auto">
      <h1 className="font-bold text-3xl">Connection Requests</h1>
      {requests?.map((request) => {
        const { name, photoUrl, age, gender, skills, about } =
          request?.fromUserId;

        return (
          <div className="card bg-base-200 w-96 shadow">
            <figure>
              <img src={photoUrl} alt="User Display Picture" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
              <div className="flex gap-4 flex-wrap">
                {skills?.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="bg-base-300 shadow-md rounded py-2 px-3 max-w-fit"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <div className="card-actions justify-center my-2">
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequest("accepted", request?._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => reviewRequest("rejected", request?._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
