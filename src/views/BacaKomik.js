import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

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

    // alignSelf: "center",
  },
  pageImage: {
    width: 600,
    marginBottom: 10,
    [theme.breakpoints.down("xs")]: {
      width: 270,
    },
  },
}));

export default function DetailKomik() {
  const classes = useStyles();
  let { slug } = useParams();
  const { REACT_APP_API_URL } = process.env;

  const [chapterDetail, setChapterDetail] = useState(null);
  // const fetchChapterPage = () => {
  //   axios
  //     .get(`${REACT_APP_API_URL}api/chapter/${slug}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setChapterDetail(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    // fetchChapterPage();
    axios
      .get(`${REACT_APP_API_URL}api/chapter/${slug}`)
      .then((res) => {
        console.log(res.data);
        setChapterDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {chapterDetail ? chapterDetail.chapter_name : "Baca Manga"}
        </title>
      </Helmet>
      {chapterDetail !== null ? (
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
      ) : null}
    </div>
  );
}
