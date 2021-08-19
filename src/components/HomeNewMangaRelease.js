import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NextIcon from "@material-ui/icons/SkipNext";
import clsx from "clsx";
import React, { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import { HomeGenres, NewCard, NewCardShimmer } from "./";

// const ShimmerNewManga = memo(({ shimmerVal, isLight }) => {
//   console.log("SHimmer ku");
//   return (
//     <>
//       {shimmerVal.map((item, index) => {
//         return <NewCardShimmer key={index} isLight={isLight} />;
//       })}
//     </>
//   );
// });

const NewManga = ({ mangaList, isLight }) => {
  return (
    <>
      {mangaList.map((item, index) => {
        return <NewCard key={index} item={item} isLight={isLight} />;
      })}
    </>
  );
};

const ShimmerNewManga = ({ shimmerVal, isLight }) => {
  //   console.log("SHimmer ku");
  return (
    <>
      {shimmerVal.map((item, index) => {
        return <NewCardShimmer key={index} isLight={isLight} />;
      })}
    </>
  );
};

const HomeNewMangaRelease = memo(
  ({ isLight, isLoading, mangaList, genreList }) => {
    console.log("pretty big component");
    const [myCustomState, setmyCustomState] = useState("KEKW");
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
    const shimmerVal = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

    const MyTypography = withStyles((theme) => ({
      root: {
        color: theme.palette[isLight ? "light" : "dark"].fontMain,
      },
    }))(Typography);

    return (
      <div className={clsx(classes.contentWrapper)}>
        <div className={clsx(classes.leftContent)}>
          {isLoading ? (
            <ShimmerNewManga shimmerVal={shimmerVal} isLight={isLight} />
          ) : (
            <NewManga mangaList={mangaList} isLight={isLight} />
          )}
          {/* <ShimmerNewManga shimmerVal={shimmerVal} isLight={isLight} /> */}
          {/* <NewManga mangaList={mangaList} isLight={isLight} /> */}

          <NavLink
            exact
            style={{
              color: "white",
              textDecoration: "none",
              marginBottom: 20,
            }}
            to={`/komik/1`}
          >
            <Button
              variant="contained"
              className={clsx(classes.button)}
              endIcon={<NextIcon />}
              disabled={isLoading}
            >
              Lihat Semua Manga
            </Button>
          </NavLink>
        </div>

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          style={{ marginLeft: 20 }}
        >
          <MyTypography variant="h5">DaftarGenre</MyTypography>
          <Box display="flex" flexWrap="wrap">
            {genreList.map((item, index) => {
              return (
                <HomeGenres
                  key={index}
                  name={item.genre_name}
                  endpoint={item.endpoint}
                  isLight={isLight}
                />
              );
            })}
          </Box>
        </Box>
      </div>
    );
  }
);

export default HomeNewMangaRelease;
