import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TimeIcon from "@material-ui/icons/Timelapse";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

const NewCard = ({ item, isLight }) => {
  // console.log("NEW RELEASE Component");
  const { thumb, title, type, updated_on, endpoint, chapter } = item;
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

  const MyTypography = withStyles((theme) => ({
    root: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }))(Typography);

  return (
    <NavLink to={`detail/${endpoint}`} style={{ textDecoration: "none" }}>
      <div className={clsx(classes.root)}>
        <img
          src={thumb}
          // src="https://picsum.photos/300/200"
          alt="God Thief Agent"
          className={clsx(classes.thumbnail)}
        />
        <div className={clsx(classes.content)}>
          <MyTypography
            paragraph
            variant="subtitle1"
            style={{
              overflow: "hidden",
              height: 20,

              marginBottom: 5,
            }}
          >
            {title}
          </MyTypography>

          <MyTypography paragraph variant="subtitle2">
            {type} | {chapter}
          </MyTypography>
        </div>
        <div className={clsx(classes.timeWrapper)}>
          <TimeIcon className={clsx(classes.iconColor)} />
          <MyTypography paragraph variant="subtitle2" style={{ marginLeft: 5 }}>
            {updated_on}
          </MyTypography>
        </div>
      </div>
    </NavLink>
  );
};

export default NewCard;
