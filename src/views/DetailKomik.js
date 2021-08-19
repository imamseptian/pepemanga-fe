import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { ChapterItem } from "../components";
import { ThemeContext } from "../store/ThemeContext";

export default function DetailKomik() {
  const { isLight } = useContext(ThemeContext);

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
  let { slug } = useParams();
  const { REACT_APP_API_URL } = process.env;

  const [mangaDetail, setmangaDetail] = useState(null);
  const [showMore, setShowMore] = useState(false);
  // const fetchMangaDetail = () => {
  //   axios
  //     .get(`${REACT_APP_API_URL}api/manga/detail/${slug}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setmangaDetail(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    // fetchMangaDetail();
    axios
      .get(`${REACT_APP_API_URL}api/manga/detail/${slug}`)
      .then((res) => {
        console.log(res.data);
        setmangaDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{mangaDetail ? mangaDetail.title : "Detail Manga"}</title>
      </Helmet>
      {mangaDetail !== null ? (
        <Card className={classes.root}>
          <img
            src={mangaDetail.thumb}
            alt=""
            // style={{
            //   borderRadius: 10,
            //   maxWidth: "100%",
            //   width: "250px",
            //   height: "auto",
            //   margin: "10px auto",
            // }}
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
                maxHeight: showMore ? "100%" : 90,
                overflow: showMore ? "visible" : "hidden",
                marginBottom: 10,
              }}
            >
              {mangaDetail.synopsis}
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              className={clsx(classes.showOverflow)}
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              Show {showMore ? "Less" : "More"}
            </Typography>

            <Typography className={clsx(classes.fontColor)} variant="h6">
              Chapter
            </Typography>
            {mangaDetail.chapter.map((item, index) => {
              return (
                <ChapterItem
                  key={index}
                  chapter={item.chapter_title}
                  slug={item.chapter_endpoint}
                />
              );
            })}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
