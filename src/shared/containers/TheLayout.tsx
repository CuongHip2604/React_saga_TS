import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { TheContent, TheFooter, TheHeader, TheSidebar } from 'shared/containers';
import { useAppSelector } from 'shared/hooks';
import { DRAWER_WIDTH } from 'shared/plugins/constants';
import clsx from 'clsx';

const drawerWidth = DRAWER_WIDTH;

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridAutoColumns: '250px 1fr',
    gridTemplateAreas: "'sidebar header' 'sidebar main'",
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.paper,
    height: theme.spacing(6) + 1,
    width: `calc(100% - ${drawerWidth}px)`,
    position: "fixed",
    top: 0,
    right: 0,
    left: "auto",
  },
  sidebar: {
    gridArea: 'sidebar',
  },
  main: {
    gridArea: 'main',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: theme.spacing(6) + 1,
  },
  mainShift: {
    marginLeft: -drawerWidth + theme.spacing(7) + 1,
    width: `calc(100% + ${drawerWidth- theme.spacing(7) - 1}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  headerShift: {
    width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function TheLayout() {
  const classes = useStyle();
  const sidebarShow = useAppSelector((state) => state.root.sidebarShow);

  return (
    <Box className={classes.root}>
      <Box className={classes.sidebar}>
        <TheSidebar />
      </Box>
      <Box
        className={clsx(classes.header, {
          [classes.headerShift]: !sidebarShow,
        })}
      >
        <TheHeader />
      </Box>
      <Box
        className={clsx(classes.main, {
          [classes.mainShift]: !sidebarShow,
        })}
      >
        <TheContent />
        <TheFooter />
      </Box>
    </Box>
  );
}

export default TheLayout;
