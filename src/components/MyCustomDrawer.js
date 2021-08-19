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
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ThemeContext } from "../store/ThemeContext";
const drawerWidth = 240;
const MyCustomDrawer = ({ isLight, open, handleDrawerClose, handleChange }) => {
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

  const useStyles = makeStyles((theme) => ({
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
    iconDark: {
      color: isLight
        ? theme.palette.light.fontMain
        : theme.palette.dark.fontMain,
    },
  }));
  const classes = useStyles();

  return (
    <Drawer
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
        <IconButton onClick={handleDrawerClose} className={classes.iconDark}>
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
        <Typography variant="subtitle2" className={clsx(classes.drawerText)}>
          Dark
        </Typography>
        <AntSwitch checked={isLight} onChange={handleChange} name="checkedC" />
        <Typography variant="subtitle2" className={clsx(classes.drawerText)}>
          Light
        </Typography>
      </div>
    </Drawer>
  );
};

export default MyCustomDrawer;
