import { makeStyles } from "@material-ui/core/styles";
import TimeIcon from "@material-ui/icons/Timelapse";
import Skeleton from "@material-ui/lab/Skeleton";
import clsx from "clsx";
import React from "react";

const NewCardShimmer = ({ isLight }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      borderRadius: 5,
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",

      padding: 5,
      "&:hover": {
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
      },
      position: "relative",
      marginBottom: 15,
    },
    thumbnail: {
      height: 90,
      width: 150,
      objectFit: "cover",
      borderRadius: 5,
    },
    content: {
      flex: 1,
      marginLeft: 10,
    },
    timeWrapper: {
      display: "flex",
      position: "absolute",
      bottom: 0,
      right: 10,
    },
    iconColor: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }));
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <Skeleton variant="rect" width={150} height={90} />
      <div className={clsx(classes.content)}>
        <Skeleton variant="text" />

        <Skeleton variant="text" />
      </div>
      <div className={clsx(classes.timeWrapper)}>
        <TimeIcon className={clsx(classes.iconColor)} />
        <Skeleton variant="text" width={50} />
      </div>
    </div>
  );
};

export default NewCardShimmer;
