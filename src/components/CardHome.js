import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TimeIcon from "@material-ui/icons/Timelapse";
import clsx from "clsx";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../store/ThemeContext";

export default function CardHome({
  title,
  thumbnail,
  type,
  updated_on,
  chapter,
  slug,
}) {
  const { isLight } = useContext(ThemeContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      // maxWidth: 345,
      width: 300,
      // marginRight: 30,
      // marginBottom: 20,
      margin: "10px 15px",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      "&:hover": {
        opacity: "0.7",
      },
      background: theme.palette[isLight ? "light" : "dark"].card,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },

    contentBottom: {
      marginTop: "auto",
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
    <div>
      <NavLink to={`/detail/${slug}`} style={{ textDecoration: "none" }}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={thumbnail}
            title={title}
          />
          {/* <CardHeader
            title={title}
            subheader={`${type} ${chapter ? `| ${chapter}` : ""}`}
            titleTypographyProps={{ variant: "subtitle1" }}
            subheaderTypographyProps={{ variant: "subtitle2" }}
          /> */}
          <div style={{ margin: "0 10px" }}>
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

          <CardActions disableSpacing className={classes.contentBottom}>
            <IconButton aria-label="updated" className={clsx(classes.expand)}>
              <TimeIcon className={clsx(classes.cardSubtitle)} />
            </IconButton>
            <Typography
              variant="subtitle2"
              className={clsx(classes.cardSubtitle)}
            >
              {updated_on}
            </Typography>
          </CardActions>
        </Card>
      </NavLink>
    </div>
  );
}
