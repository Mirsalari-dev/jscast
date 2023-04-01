import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElemet from "./SkeletonElemet";

const SkeletonPost = () => {
  return (
    <div className="relative h-72">
      <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72">
      <SkeletonElemet type="img" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonPost;
