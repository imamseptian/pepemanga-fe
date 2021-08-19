import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

export default function Shimmer() {
  return (
    <div style={{ margin: "10px 10px" }}>
      <Skeleton variant="text" />
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton variant="rect" width={300} height={118} />
    </div>
  );
}
