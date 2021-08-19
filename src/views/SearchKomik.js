import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { CardHome, Loader, Shimmer } from "../components";
import { ThemeContext } from "../store/ThemeContext";

export default function SearchKomik() {
  const { isLight } = useContext(ThemeContext);

  const [mangaList, setmangaList] = useState([]);

  let { query } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    // fetchManga();
    setIsLoading(true);
    axios
      .get(`${REACT_APP_API_URL}api/search/${query}`)
      .then((res) => {
        // console.log(res.data.manga_list);
        setmangaList(res.data.manga_list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [query]);

  // const fetchManga = () => {
  //   setIsLoading(true);
  //   axios
  //     .get(`${REACT_APP_API_URL}api/search/${query}`)
  //     .then((res) => {
  //       // console.log(res.data.manga_list);
  //       setmangaList(res.data.manga_list);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // };

  const shimmerVal = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const ShimmerPlaceHolder = () => {
    return (
      <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
        {shimmerVal.map((item, index) => {
          return <Shimmer />;
        })}
      </Box>
    );
  };

  const MyTypography = withStyles((theme) => ({
    root: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }))(Typography);

  const ListManga = () => {
    if (mangaList.length > 0) {
      return (
        <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
          {mangaList.map((item, index) => {
            return (
              <CardHome
                key={index}
                title={item.title}
                thumbnail={item.thumb}
                type={item.type}
                updated_on={item.updated_on}
                chapter={item.chapter}
                slug={item.endpoint}
              />
            );
          })}
        </Box>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyTypography paragraph variant="h4" align="center">
            Maaf Manga yang Anda Cari Tidak Ditemukan
          </MyTypography>
        </div>
      );
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cari Manga {decodeURIComponent(query)}</title>
      </Helmet>
      {isLoading ? <Loader /> : null}
      <MyTypography paragraph variant="h5" align="center">
        Hasil Pencarian : {mangaList.length}
      </MyTypography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroun: "red",
        }}
      >
        {isLoading ? <ShimmerPlaceHolder /> : <ListManga />}
      </div>
    </div>
  );
}
