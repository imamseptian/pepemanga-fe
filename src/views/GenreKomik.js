import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NextIcon from "@material-ui/icons/SkipNext";
import PrevIcon from "@material-ui/icons/SkipPrevious";
import axios from "axios";
import clsx from "clsx";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useParams } from "react-router-dom";
import { CardGenre, Loader, Shimmer } from "../components";
import { ThemeContext } from "../store/ThemeContext";

export default function KomikPage({ title, endpoint, keyword, reactPath }) {
  const { isLight } = useContext(ThemeContext);
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      minWidth: 125,
      background: theme.palette.light.navbar,
    },
    fontColor: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }));
  const classes = useStyles();
  const topSectionRef = useRef(null);

  const [mangaList, setmangaList] = useState([]);

  let { genre, page } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    // fetchManga();
    setIsLoading(true);
    axios
      .get(`${REACT_APP_API_URL}api/genres/${genre}/${page}`)
      .then((res) => {
        // console.log(res.data.manga_list);
        setmangaList(res.data.manga_list);
        // console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    topSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  // const fetchManga = () => {
  //   setIsLoading(true);
  //   axios
  //     .get(`${REACT_APP_API_URL}api/genres/${genre}/${page}`)
  //     .then((res) => {
  //       // console.log(res.data.manga_list);
  //       setmangaList(res.data.manga_list);
  //       // console.log(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // };

  const shimmerVal = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  const ShimmerPlaceHolder = () => {
    return (
      <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
        {shimmerVal.map((item, index) => {
          return <Shimmer />;
        })}
      </Box>
    );
  };

  const ListManga = () => {
    return (
      <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
        {mangaList.map((item, index) => {
          return (
            <CardGenre
              key={index}
              title={item.title}
              thumbnail={item.thumb}
              type={item.type}
              slug={item.endpoint}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <div ref={topSectionRef}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Genre | {page}</title>
      </Helmet>
      {isLoading ? <Loader /> : null}
      <Typography
        paragraph
        variant="h5"
        align="center"
        className={clsx(classes.fontColor)}
      >
        {title}
      </Typography>
      {isLoading ? <ShimmerPlaceHolder /> : <ListManga />}
      <Box justifyContent="center" style={{ width: "100%", display: "flex" }}>
        {parseInt(page) > 1 ? (
          <NavLink
            exact
            style={{
              color: "white",
              textDecoration: "none",
            }}
            to={`/genre/${genre}/${parseInt(page) - 1}`}
          >
            <Button
              variant="contained"
              className={clsx(classes.button)}
              startIcon={<PrevIcon />}
              disabled={isLoading}
            >
              Previous
            </Button>
          </NavLink>
        ) : null}
        <NavLink
          exact
          style={{
            color: "white",
            textDecoration: "none",
          }}
          to={`/genre/${genre}/${parseInt(page) + 1}`}
        >
          <Button
            variant="contained"
            className={clsx(classes.button)}
            endIcon={<NextIcon />}
            disabled={isLoading}
          >
            Next
          </Button>
        </NavLink>
      </Box>
    </div>
  );
}
