import { createStyles, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar } from '@material-ui/core';

import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'shared/hooks';
import { DRAWER_WIDTH } from 'shared/plugins/constants';
import { navs } from './_nav';

const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
    },
    link: {
      color: "inherit",
      textDecoration: "none",

      "&.active > div": {
        backgroundColor: "#f0f0f0"
      }
    }
  })
);

export function TheSidebar() {
  const classes = useStyles();
  const sidebarShow = useAppSelector((state) => state.root.sidebarShow);
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: sidebarShow,
        [classes.drawerClose]: !sidebarShow,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: sidebarShow,
          [classes.drawerClose]: !sidebarShow,
        }),
      }}
    >
      <Toolbar className={classes.toolbar} variant="dense">
        Logo
      </Toolbar>
      <Divider />
      <List disablePadding>
        {navs.map((nav, index) => (
          <NavLink key={index} to={nav.to} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <nav.icon />
              </ListItemIcon>
              <ListItemText primary={nav.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
}
