import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { ChapterItem, DetailManga, DetailMangaShimmer } from "../components";
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
        <DetailManga mangaDetail={mangaDetail} isLight={isLight} />
      ) : (
        <DetailMangaShimmer isLight={isLight} />
      )}
      {/* <DetailMangaShimmer isLight={isLight} /> */}
    </div>
  );
}
