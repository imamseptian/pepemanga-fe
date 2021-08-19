import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { memo, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  HomeNewMangaRelease,
  HomePopularSection,
  Loader,
  NewCard,
  NewCardShimmer,
} from "../components";
import { ThemeContext } from "../store/ThemeContext";

const MyCover = memo(({ thumb, idx, text }) => {
  console.log("add thumb " + idx);
  return (
    <div>
      <img
        src={thumb}
        alt=""
        style={{
          height: 150,
          marginBottom: 10,
          marginRight: 10,
          borderRadius: 5,
        }}
      />
      {`image ${text} ${idx}`}
    </div>
  );
});

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
  const [myKey, setmyKey] = useState("");

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
          console.log(REACT_APP_API_URL);
          setmangaList(responses[0].data.manga_list);
          setpopularList(responses[1].data.manga_list);
          // setrecommendedList(responses[2].data.manga_list);
          // setmanhuaList(responses[3].data.manga_list);
          // setmanhwaList(responses[4].data.manga_list);
          setgenreList(responses[2].data.list_genre);
          setIsLoading(false);

          // use/access the results
        })
      )
      .catch((errors) => {
        console.log(REACT_APP_API_URL);
        console.log(errors);
        // alert("error");
        setIsLoading(false);
        // react on errors.
      });
  };

  const getManga2 = () => {
    setIsLoading(true);

    const { REACT_APP_API_URL } = process.env;

    let popularUrl2 = `${REACT_APP_API_URL}api/manga/popular/2`;

    axios
      .get(popularUrl2)
      .then((res) => {
        console.log(res.data);
        setpopularList(res.data.manga_list);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(popularUrl2);
        setIsLoading(false);
      });
  };

  // const shimmerVal = [
  //   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  // ];

  const NewManga = () => {
    return (
      <>
        {mangaList.map((item, index) => {
          return <NewCard key={index} item={item} />;
        })}
      </>
    );
  };
  const MyTypography = withStyles((theme) => ({
    root: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }))(Typography);

  // const MyCover = ({ thumb, idx }) => {
  //   console.log("add thumb " + idx);
  //   return (
  //     <img
  //       src={thumb}
  //       alt=""
  //       style={{
  //         height: 150,
  //         marginBottom: 10,
  //         marginRight: 10,
  //         borderRadius: 5,
  //       }}
  //     />
  //   );
  // };

  return (
    <div>
      {isLoading ? <Loader /> : null}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pepe-Manga Homepage</title>
      </Helmet>

      {/* <HomeComicSection
        title={"Populer"}
        isLoading={isLoading}
        mangaList={popularList}
        keyword="popular"
        endpoint="/popular/1"
      /> */}
      {/* <ImageMangaMemo mangaList={popularList} isLight={isLight} /> */}

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

      {/* <button
        onClick={() => {
          getManga2();
        }}
      >
        Click page 2
      </button> */}
    </div>
  );
}
