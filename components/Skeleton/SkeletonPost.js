import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElemet from "./SkeletonElemet";

const SkeletonPost = () => {
  return (
    <div className="bg-white shadow-lg relative rounded-lg p-0 lg:p-8 pb-4 lg:mb-8">
      <div>
        <SkeletonElemet type="img" />
          <SkeletonElemet type="title" />
        <SkeletonElemet type="button" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonPost;
