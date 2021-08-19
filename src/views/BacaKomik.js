import Card from "@material-ui/core/Card";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState, memo, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ErrorIcon from "@material-ui/icons/Error";
import { TrainRounded } from "@material-ui/icons";
import { ThemeContext } from "../store/ThemeContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 620,
    margin: "10px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0 ",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  pageImage: {
    width: 600,
    marginBottom: 10,
    [theme.breakpoints.down("xs")]: {
      width: 270,
    },
  },
}));

const PageList = memo(({ chapterDetail }) => {
  console.log("page list");
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {chapterDetail.chapter_image.map((item, index) => {
        return (
          <img
            src={item.chapter_image_link}
            key={index}
            alt=""
            // style={{ width: 600, marginBottom: 10 }}
            className={clsx(classes.pageImage)}
          />
        );
      })}
    </Card>
  );
});

export default function BacaKomik() {
  const { isLight } = useContext(ThemeContext);
  const classes = useStyles();
  let { slug } = useParams();
  const { REACT_APP_API_URL } = process.env;

  const [chapterDetail, setChapterDetail] = useState(null);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    // fetchChapterPage();
    axios
      .get(`${REACT_APP_API_URL}api/chapter/${slug}`)
      .then((res) => {
        if (res.data.chapter_pages > 0) {
          setChapterDetail(res.data);
        } else {
          setisError(true);
        }
      })
      .catch((err) => {
        setisError(true);
        console.log(err);
      });
  }, []);

  const MyTypography = withStyles((theme) => ({
    root: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }))(Typography);

  if (isError) {
    return (
      <div
        style={{
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <ErrorIcon style={{ fontSize: 50, marginRight: 10 }} />
        <MyTypography variant="h4">Terjadi Kesalahan Pada Server</MyTypography>
      </div>
    );
  } else {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {chapterDetail ? chapterDetail.chapter_name : "Baca Manga"}
          </title>
        </Helmet>
        {chapterDetail !== null ? (
          <PageList chapterDetail={chapterDetail} />
        ) : null}
      </div>
    );
  }
}
