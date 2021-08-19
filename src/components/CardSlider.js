import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TimeIcon from "@material-ui/icons/Timelapse";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

export default function CardSlider({
  title,
  thumbnail,
  type,
  updated_on,
  chapter,
  slug,
  isLight,
}) {
  const useStyles = makeStyles((theme) => ({
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    cardTitle: {
      fontWeight: "bold",
      overflow: "hidden",
      height: 50,
      marginBottom: 3,
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
    cardSubtitle: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }));
  const classes = useStyles();

  return (
    <NavLink to={`/detail/${slug}`} style={{ textDecoration: "none" }}>
      <div className={`wrapper-item ${!isLight && "dark"}`}>
        <img src={thumbnail} alt="" className="item-thumbnail" />
        <div style={{ margin: "0 5px" }}>
          <Typography variant="subtitle1" className={clsx(classes.cardTitle)}>
            {title}
          </Typography>
          {type && (
            <Typography
              variant="subtitle2"
              className={clsx(classes.cardSubtitle)}
            >{`${type} ${chapter ? `| ${chapter}` : ""}`}</Typography>
          )}
        </div>
        {updated_on && (
          <div
            style={{
              display: "flex",

              marginTop: 10,
              flex: 1,
            }}
          >
            <IconButton aria-label="updated" className={clsx(classes.expand)}>
              <TimeIcon className={clsx(classes.cardSubtitle)} />
              <Typography
                variant="subtitle2"
                className={clsx(classes.cardSubtitle)}
              >
                {updated_on}
              </Typography>
            </IconButton>
          </div>
        )}
      </div>
    </NavLink>
  );
}
