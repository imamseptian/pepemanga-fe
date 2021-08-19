import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { memo, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  HomeNewMangaRelease,
  HomePopularSection,
  Loader,
  NewCardShimmer,
} from "../components";
import { ThemeContext } from "../store/ThemeContext";
import ErrorIcon from "@material-ui/icons/Error";

const ShimmerNewManga = memo(({ shimmerVal, isLight }) => {
  console.log("SHimmer ku");
  return (
    <>
      {shimmerVal.map((item, index) => {
        return <NewCardShimmer key={index} isLight={isLight} />;
      })}
    </>
  );
});

export default function Home() {
  const { isLight } = useContext(ThemeContext);
  const useStyles = makeStyles((theme) => ({
    contentWrapper: {
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },

    leftContent: {
      flex: 2,
      marginBottom: 20,
    },
    rightContent: {
      flex: "1",
      diplay: "flex",

      marginLeft: 20,
    },
  }));

  const classes = useStyles();
  const [mangaList, setmangaList] = useState([]);
  const [popularList, setpopularList] = useState([]);
  // const [recommendedList, setrecommendedList] = useState([]);
  // const [manhuaList, setmanhuaList] = useState([]);
  // const [manhwaList, setmanhwaList] = useState([]);
  const [genreList, setgenreList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    fetchManga();
  }, []);

  const fetchManga = () => {
    setIsLoading(true);

    const { REACT_APP_API_URL } = process.env;

    let mangaUrl = axios.get(`${REACT_APP_API_URL}api/manga/page/1`);
    let popularUrl = axios.get(`${REACT_APP_API_URL}api/manga/popular/1`);
    // let recommendedUrl = axios.get(`${REACT_APP_API_URL}api/recommended`);
    // let manhuaUrl = axios.get(`${REACT_APP_API_URL}api/manhua/1`);
    // let manhwaUrl = axios.get(`${REACT_APP_API_URL}api/manhwa/1`);
    let genresUrl = axios.get(`${REACT_APP_API_URL}api/genres`);
    axios
      .all([
        mangaUrl,
        popularUrl,
        // recommendedUrl,
        // manhuaUrl,
        // manhwaUrl,
        genresUrl,
      ])
      .then(
        axios.spread((...responses) => {
          // console.log(REACT_APP_API_URL);
          // setmangaList(responses[0].data.manga_list);
          // setpopularList(responses[1].data.manga_list);
          // // setrecommendedList(responses[2].data.manga_list);
          // // setmanhuaList(responses[3].data.manga_list);
          // // setmanhwaList(responses[4].data.manga_list);
          // setgenreList(responses[2].data.list_genre);
          // setIsLoading(false);

          if (responses[0].data.status) {
            setmangaList(responses[0].data.manga_list);
            setpopularList(responses[1].data.manga_list);
            // setrecommendedList(responses[2].data.manga_list);
            // setmanhuaList(responses[3].data.manga_list);
            // setmanhwaList(responses[4].data.manga_list);
            setgenreList(responses[2].data.list_genre);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setisError(true);
          }

          // use/access the results
        })
      )
      .catch((errors) => {
        console.log(REACT_APP_API_URL);
        console.log(errors);
        // alert("error");
        setisError(true);
        setIsLoading(false);
        // react on errors.
      });
  };

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
        {isLoading ? <Loader /> : null}
        <Helmet>
          <meta charSet="utf-8" />
          <title>Pepe-Manga Homepage</title>
        </Helmet>

        <HomePopularSection
          title={"Populer"}
          isLoading={isLoading}
          mangaList={popularList}
          keyword="popular"
          endpoint="/popular/1"
          isLight={isLight}
        />

        <MyTypography variant="h5">Update Terbaru</MyTypography>

        <HomeNewMangaRelease
          // shimmerVal={shimmerVal}
          isLight={isLight}
          isLoading={isLoading}
          mangaList={mangaList}
          genreList={genreList}
        />
      </div>
    );
  }
}
