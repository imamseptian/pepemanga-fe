import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NextIcon from "@material-ui/icons/SkipNext";
import PrevIcon from "@material-ui/icons/SkipPrevious";
import axios from "axios";
import clsx from "clsx";
import React, { useContext, useEffect, useRef, useState, memo } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useParams } from "react-router-dom";
import { CardHome, Loader, Shimmer } from "../components";
import { ThemeContext } from "../store/ThemeContext";
import ErrorIcon from "@material-ui/icons/Error";

const ShimmerPlaceHolder = memo(({ isLight }) => {
  console.log("SHIMMER KOMIK 1");
  const shimmerVal = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  return (
    <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
      {shimmerVal.map((item, index) => {
        return <Shimmer key={index} />;
      })}
    </Box>
  );
});

const ListManga = memo(({ mangaList, keyword, isLight }) => {
  return (
    <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
      {mangaList.map((item, index) => {
        return (
          <CardHome
            key={index}
            title={item.title}
            thumbnail={item.thumb}
            type={item.type}
            updated_on={keyword === "all" ? item.updated_on : item.upload_on}
            chapter={item.chapter}
            slug={item.endpoint}
            isLight={isLight}
          />
        );
      })}
    </Box>
  );
});

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
  const [isError, setisError] = useState(false);

  let { page } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  const MyTypography = withStyles((theme) => ({
    root: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }))(Typography);

  useEffect(() => {
    // fetchManga();
    setIsLoading(true);
    axios
      .get(`${REACT_APP_API_URL}api/${endpoint}/${page}`)
      .then((res) => {
        if (res.data.status) {
          // console.log(res.data.manga_list);
          setmangaList(res.data.manga_list);
          // console.log(res.data);

          setIsLoading(false);
        } else {
          setisError(true);

          setIsLoading(false);
        }
      })
      .catch((err) => {
        setisError(true);
        console.log(err);
        setIsLoading(false);
      });

    topSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }, [endpoint, page]);

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
      <div ref={topSectionRef}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {title} | Page {page}
          </title>
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
        {isLoading ? (
          <ShimmerPlaceHolder />
        ) : (
          <ListManga
            isLight={isLight}
            mangaList={mangaList}
            keyword={keyword}
          />
        )}
        {/* <ShimmerPlaceHolder /> */}

        <Box justifyContent="center" style={{ width: "100%", display: "flex" }}>
          {parseInt(page) > 1 ? (
            <NavLink
              exact
              style={{
                color: "white",
                textDecoration: "none",
              }}
              to={`/${reactPath}/${parseInt(page) - 1}`}
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
            to={`/${reactPath}/${parseInt(page) + 1}`}
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
}
