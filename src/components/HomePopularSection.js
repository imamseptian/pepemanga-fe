import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { CardSlider, CardSliderShimmer } from "./";

const HomePopularSection = memo(
  ({ title, mangaList, isLoading, keyword, endpoint, isLight }) => {
    console.log("top component ku");
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

    const MangaList = ({ isLight, mangaList }) => {
      return (
        <div className={`custom-wrapper ${!isLight && "dark"}`}>
          {mangaList.map((item, index) => {
            return (
              <CardSlider
                key={index}
                title={item.title}
                thumbnail={item.thumb}
                type={item.type}
                updated_on={item.upload_on}
                chapter={item.chapter}
                slug={item.endpoint}
                isLight={isLight}
              />
            );
          })}
        </div>
      );
    };

    const ShimmerList = ({ isLight, shimmerVal }) => {
      return (
        <div className={`custom-wrapper ${!isLight && "dark"}`}>
          {shimmerVal.map((item, index) => {
            return <CardSliderShimmer key={index} isLight={isLight} />;
          })}
        </div>
      );
    };

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

        {isLoading ? (
          <ShimmerList isLight={isLight} shimmerVal={shimmerVal} />
        ) : (
          <MangaList isLight={isLight} mangaList={mangaList} />
        )}
      </div>
    );
  }
);

export default HomePopularSection;
