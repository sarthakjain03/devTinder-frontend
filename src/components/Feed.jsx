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

  if (!feed) return;

  if (feed?.length <= 0) {
    return (
      <div className="flex justify-center my-10 min-h-screen mx-auto">
        <h1 className="font-bold text-3xl">No New Users Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-8 min-h-screen">
      <UserCard userDetails={feed?.[0]} />
    </div>
  );
};

export default Feed;
