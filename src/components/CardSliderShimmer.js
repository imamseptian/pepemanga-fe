import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

export default function CardSliderShimmer({ isLight }) {
  return (
    <div className={`wrapper-item ${!isLight && "dark"}`}>
      <Skeleton variant="rect" width={200} height={135} />
      <div style={{ margin: "10px 5px" }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </div>
  );
}
