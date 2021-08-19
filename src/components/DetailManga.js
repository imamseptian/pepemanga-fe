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

const DetailManga = memo(({ mangaDetail, isLight }) => {
  console.log("DETAIL MANGA");
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "90%",
      margin: "10px auto",
      display: "flex",
      flexDirection: "column",
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
      <img
        src={mangaDetail.thumb}
        alt=""
        className={clsx(classes.thumbnailImage)}
      />
      {/* <CardHeader
              title={mangaDetail.title}
              subheader={
                <div>
                  
                </div>
              }
              titleTypographyProps={{ variant: "h5" }}
            /> */}
      <div style={{ margin: "10px 20px" }}>
        <Typography
          className={clsx(classes.fontColor)}
          variant="h5"
        >{`${mangaDetail.title}`}</Typography>
        <Typography
          className={clsx(classes.fontColor)}
          variant="subtitle2"
        >{`${mangaDetail.type} - ${mangaDetail.status}`}</Typography>
        <Typography
          className={clsx(classes.fontColor)}
          variant="subtitle2"
        >{`By ${mangaDetail.author}`}</Typography>
        <Typography
          className={clsx(classes.fontColor)}
          variant="subtitle2"
          style={{ marginBottom: 10 }}
        >{`Genre : ${mangaDetail.genre_list.map((item, index) => {
          return `${item.genre_name}, `;
        })}`}</Typography>
        <Typography className={clsx(classes.fontColor)} variant="h6">
          Synopsis
        </Typography>
        <Typography
          className={clsx(classes.fontColor)}
          variant="body1"
          align="justify"
          style={{
            //   maxHeight: showMore ? "100%" : 90,
            //   overflow: showMore ? "visible" : "hidden",
            marginBottom: 20,
          }}
        >
          {mangaDetail.synopsis}
        </Typography>
        {/* <Typography
          variant="body1"
          align="justify"
          className={clsx(classes.showOverflow)}
          onClick={() => {
            // setShowMore(!showMore);
            setShow();
          }}
        >
          Show {showMore ? "Less" : "More"}
        </Typography> */}

        <Typography className={clsx(classes.fontColor)} variant="h6">
          Chapter
        </Typography>
        {mangaDetail.chapter.map((item, index) => {
          return (
            <ChapterItem
              key={index}
              chapter={item.chapter_title}
              slug={item.chapter_endpoint}
              isLight={isLight}
            />
          );
        })}
      </div>
    </Card>
  );
});

export default DetailManga;
