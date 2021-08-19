import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

const HomeGenres = ({ name, endpoint, isLight }) => {
  console.log("GENRE HOME ---");
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: 3,
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",

      padding: "1px 5px",
      "&:hover": {
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
      },
      cursor: "pointer",
      marginRight: 7,
      marginBottom: 5,
      border: "1px solid white",
    },
    fontLink: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
      textDecoration: "none",
    },
  }));

  const classes = useStyles();

  return (
    <NavLink to={`/genre/${endpoint}/1`} className={clsx(classes.fontLink)}>
      <div className={clsx(classes.root)}>
        <Typography variant="subtitle1">{name}</Typography>
      </div>
    </NavLink>
  );
};

export default HomeGenres;
