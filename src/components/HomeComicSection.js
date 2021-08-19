import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { useContext, memo } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../store/ThemeContext";
import { CardSlider, CardSliderShimmer } from "./";

const CardMemo = memo((props) => {
  return (
    <CardSlider
      title={props.item.title}
      thumbnail={props.item.thumb}
      type={props.item.type}
      updated_on={props.item.upload_on}
      chapter={props.item.chapter}
      slug={props.item.endpoint}
    />
  );
});

const ShimmerList = memo(({ isLight, shimmerVal }) => {
  return (
    <div className={`custom-wrapper ${!isLight && "dark"}`}>
      {shimmerVal.map((item, index) => {
        return <CardSliderShimmer key={index} />;
      })}
    </div>
  );
});

const MangaList = memo(({ isLight, mangaList }) => {
  return (
    <div className={`custom-wrapper ${!isLight && "dark"}`}>
      {mangaList.map((item, index) => {
        return <CardMemo key={index} item={item} />;
      })}
    </div>
  );
});

// const HomeComicSection = ({
//   title,
//   mangaList,
//   isLoading,
//   keyword,
//   endpoint,
// }) =>

const HomeComicSection = memo(
  ({ title, mangaList, isLoading, keyword, endpoint }) => {
    console.log("top component ku");
    const { isLight } = useContext(ThemeContext);
    const useStyles = makeStyles((theme) => ({
      linkFont: {
        color: theme.palette[isLight ? "light" : "dark"].fontMain,
        textDecoration: "none",
      },
    }));
    const classes = useStyles();
    const shimmerVal = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

    // const MangaList = () => {
    //   return (
    //     <div className={`custom-wrapper ${!isLight && "dark"}`}>
    //       {mangaList.map((item, index) => {
    //         return (
    //           // <CardSlider
    //           //   key={index}
    //           //   title={item.title}
    //           //   thumbnail={item.thumb}
    //           //   type={item.type}
    //           //   updated_on={keyword !== "recommended" ? item[updateTime()] : null}
    //           //   chapter={item.chapter}
    //           //   slug={item.endpoint}
    //           // />
    //           <CardMemo key={index} item={item} />
    //         );
    //       })}
    //     </div>
    //   );
    // };

    // const ShimmerList = () => {
    //   return (
    //     <div className={`custom-wrapper ${!isLight && "dark"}`}>
    //       {shimmerVal.map((item, index) => {
    //         return <CardSliderShimmer key={index} />;
    //       })}
    //     </div>
    //   );
    // };

    return (
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            margin: "0 10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography paragraph variant="h5" className={clsx(classes.linkFont)}>
            {title}
          </Typography>
          {endpoint && (
            <NavLink to={endpoint} className={clsx(classes.linkFont)}>
              <Typography paragraph variant="h6">
                Lihat Semua
              </Typography>
            </NavLink>
          )}
        </div>
        {/* <div
        // style={{
        //   display: "flex",
        //   flexDirection: "row",
        //   overflowX: "scroll",
        //   maxWidth: "90vw",
        //   margin: "0 auto",
        // }}
        className="custom-wrapper"
      > */}
        {/* {isLoading ? <ShimmerList /> : <MangaList />} */}
        {isLoading ? (
          <ShimmerList isLight={isLight} shimmerVal={shimmerVal} />
        ) : (
          <MangaList isLight={isLight} mangaList={mangaList} />
        )}
        {/* <ShimmerList /> */}
        {/* <ShimmerList /> */}
        {/* </div> */}
      </div>
    );
  }
);

export default HomeComicSection;
