import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import clsx from "clsx";
import React, { useContext, useEffect, useState, memo } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { ChapterItem } from "../components";
import { ThemeContext } from "../store/ThemeContext";
import Skeleton from "@material-ui/lab/Skeleton";

const DetailMangaShimmer = memo(({ isLight }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "90%",
      margin: "10px auto",
      display: "flex",
      flexDirection: "column",
      padding: "10px 10px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: "0px 0px",
      },
      background: theme.palette[isLight ? "light" : "dark"].card,
    },

    thumbnailImage: {
      margin: "10px auto",
      width: 300,
      borderRadius: 10,
      [theme.breakpoints.down("sm")]: {
        width: 250,
      },
    },
    showOverflow: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
      textDecoration: "underline",
      cursor: "pointer",
      width: 100,
      marginBottom: 20,
    },
    fontColor: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Skeleton
        variant="rect"
        width={250}
        height={200}
        className={clsx(classes.thumbnailImage)}
      />
      <Skeleton variant="text" style={{ width: 300 }} />
      <Skeleton variant="text" style={{ width: 100 }} />
      <Skeleton variant="text" style={{ width: 200, marginBottom: 20 }} />
      <Skeleton variant="text" style={{ width: 100 }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" style={{ marginBottom: 20 }} />

      <Skeleton variant="text" style={{ width: 100 }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Card>
  );
});

export default DetailMangaShimmer;
