import { useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const { user, connections } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axiosClient.get("/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && !connections) {
      fetchConnections();
    }
  }, [user]);

  if (!connections) return;

  if (connections?.length === 0) {
    return (
      <div className="flex justify-center my-10 min-h-screen mx-auto">
        <h1 className="font-bold text-3xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10 flex-col gap-10 min-h-screen mx-auto">
      <h1 className="font-bold text-3xl">Connections</h1>
      {connections?.map((connection) => {
        const { name, photoUrl, age, gender, skills, about } = connection;

        return (
          <div className="flex gap-8 items-center rounded-lg shadow p-4">
            <div className="w-20 overflow-hidden rounded-full">
              <img src={photoUrl} alt="user photo" />
            </div>
            <div className="flex flec-col gap-4">
              <h2 className="font-bold">{name}</h2>
              <p>
                {age}, {gender}
              </p>
              <p>{skills?.join(", ")}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
