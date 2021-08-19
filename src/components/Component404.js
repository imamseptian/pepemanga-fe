import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../store/ThemeContext";
const Component404 = () => {
  const { isLight } = useContext(ThemeContext);

  const MyTypography = withStyles((theme) => ({
    root: {
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
  }))(Typography);
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Halaman Tidak Ditemukan</title>
      </Helmet>
      <MyTypography paragraph variant="h4" align="center">
        Maaf Halaman Tidak Ditemukan
      </MyTypography>
    </div>
  );
};

export default Component404;
