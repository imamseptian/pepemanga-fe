import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  alpha,
  makeStyles,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import FirstBookIcon from "@material-ui/icons/ImportContacts";
import MenuIcon from "@material-ui/icons/Menu";
import SecondBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ThemeContext } from "../store/ThemeContext";
// import { MyCustomDrawer } from "./";

const MyCustomDrawer = lazy(() => import("./MyCustomDrawer"));

const drawerWidth = 240;

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    margin: "0 10px",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.light.primary,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function PageWrapper(props) {
  const [isLight, setisLight] = useState(true);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      background: theme.palette[isLight ? "light" : "dark"].primary,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      // width: `calc(100% - ${drawerWidth}px)`,
      width: "100%",
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      background: theme.palette[isLight ? "light" : "dark"].secondary,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    drawerText: {
      textDecoration: "none",
      color: theme.palette[isLight ? "light" : "dark"].fontMain,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
      },
      background: theme.palette[isLight ? "light" : "dark"].background,
      minHeight: "100vh",
      // background: "red",
      // position: "relative",
    },

    title: {
      flexGrow: 1,
      display: "none",
      color: "white",
      textDecoration: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    iconDark: {
      color: isLight
        ? theme.palette.light.fontMain
        : theme.palette.dark.fontMain,
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
    // sParameter = encodeURIComponent(sParameter.trim())
    // let myparam = encodeURIComponent(keyword.trim());
  };

  useEffect(() => {
    let store = JSON.parse(localStorage.getItem("PEPE_KOMIK_THEME"));
    if (store) {
      setisLight(store.isLight);
    }
  }, []);

  const handleChange = () => {
    localStorage.setItem(
      "PEPE_KOMIK_THEME",
      JSON.stringify({
        isLight: !isLight,
      })
    );
    setisLight(!isLight);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const RenderDrawer = () =>
    open ? (
      <Suspense fallback={<div>Loading</div>}>
        <MyCustomDrawer
          isLight={isLight}
          open={open}
          handleDrawerClose={handleDrawerClose}
          handleChange={handleChange}
        />
      </Suspense>
    ) : null;

  return (
    <ThemeContext.Provider value={{ isLight, setisLight }}>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <NavLink
              onClick={handleDrawerClose}
              to="/"
              className={classes.title}
            >
              <Typography variant="h6" noWrap>
                Pepe-Manga
              </Typography>
            </NavLink>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    let myQuery = encodeURIComponent(keyword.trim());
                    history.push(`/search/${myQuery}`);
                  }
                }}
                value={keyword}
              />
            </div>
          </Toolbar>
        </AppBar>
        <RenderDrawer />
        {/* <MyCustomDrawer
          isLight={isLight}
          open={open}
          handleDrawerClose={handleDrawerClose}
          handleChange={handleChange}
        /> */}
        {/* <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              onClick={handleDrawerClose}
              className={classes.iconDark}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <NavLink
              onClick={handleDrawerClose}
              to="/"
              className={clsx(classes.drawerText)}
            >
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon className={clsx(classes.iconDark)} />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <List>
            <NavLink
              onClick={handleDrawerClose}
              to="/komik/1"
              className={clsx(classes.drawerText)}
            >
              <ListItem button>
                <ListItemIcon>
                  <FirstBookIcon className={clsx(classes.iconDark)} />
                </ListItemIcon>
                <ListItemText primary={"Daftar Manga"} />
              </ListItem>
            </NavLink>

            <NavLink
              onClick={handleDrawerClose}
              to="/popular/1"
              className={clsx(classes.drawerText)}
            >
              <ListItem button>
                <ListItemIcon>
                  <SecondBookIcon className={clsx(classes.iconDark)} />
                </ListItemIcon>
                <ListItemText primary={"Popular"} />
              </ListItem>
            </NavLink>

            <NavLink
              onClick={handleDrawerClose}
              to="/manhwa/1"
              className={clsx(classes.drawerText)}
            >
              <ListItem button>
                <ListItemIcon>
                  <FirstBookIcon className={clsx(classes.iconDark)} />
                </ListItemIcon>
                <ListItemText primary={"Manhwa"} />
              </ListItem>
            </NavLink>

            <NavLink
              onClick={handleDrawerClose}
              to="/manhua/1"
              className={clsx(classes.drawerText)}
            >
              <ListItem button>
                <ListItemIcon>
                  <SecondBookIcon className={clsx(classes.iconDark)} />
                </ListItemIcon>
                <ListItemText primary={"Manhua"} />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <Typography
            variant="subtitle1"
            align="center"
            className={clsx(classes.drawerText)}
          >
            Theme
          </Typography>
          <div
            style={{
              display: "flex",
              padding: "10px 15px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              className={clsx(classes.drawerText)}
            >
              Dark
            </Typography>
            <AntSwitch
              checked={isLight}
              onChange={handleChange}
              name="checkedC"
            />
            <Typography
              variant="subtitle2"
              className={clsx(classes.drawerText)}
            >
              Light
            </Typography>
          </div>
        </Drawer> */}
        <main className={clsx(classes.content)}>
          <div className={classes.drawerHeader} />
          {props.children}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
