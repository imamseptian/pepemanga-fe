import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { memo } from "react";
// const MyThumbs = ({ item, myText, isLight }) => {
//   return (
//     <div>
//       <img src={item.thumb} alt="" style={{ height: 150 }} />
//       <p>{item.title}</p>
//       <p>{myText}</p>
//       <p>{isLight ? "Terang" : "Gelap"}</p>
//     </div>
//   );
// };

const ImageMangaMemo = memo(({ mangaList, isLight }) => {
  console.log("memo top");
  //   const { isLight } = useContext(ThemeContext);
  const myText = "cmonBruh";

  const useStyles = makeStyles((theme) => ({
    linkFont: {
      background: "red",
      padding: "10px 20px",
      color: "blue",
    },
  }));
  const classes = useStyles();

  const MyThumbs = ({ item, myText, isLight }) => {
    console.log("MY THUMBS");
    return (
      <div>
        <img src={item.thumb} alt="" style={{ height: 150 }} />
        <p>{item.title}</p>
        <p>{myText}</p>
        <p>{isLight ? "Terang" : "Gelap"}</p>
      </div>
    );
  };

  return (
    <div>
      {mangaList.map((item, index) => {
        return (
          <div key={index}>
            <h3 className={clsx(classes.linkFont)}>YEP COCK</h3>
            <MyThumbs item={item} myText={myText} isLight={isLight} />
          </div>
        );
      })}
    </div>
  );
});

export default ImageMangaMemo;
