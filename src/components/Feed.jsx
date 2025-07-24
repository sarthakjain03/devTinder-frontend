import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../axios/axiosClient";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeed = async () => {
    try {
      const res = await axiosClient.get("/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  return (
    <div className="flex justify-center p-8 gap-6 flex-wrap">
      {feed?.map((userDetails) => (
        <UserCard key={userDetails._id} userDetails={userDetails} />
      ))}
    </div>
  );
};

export default Feed;
