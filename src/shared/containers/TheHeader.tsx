import { AppBar, Avatar, Box, createStyles, IconButton, makeStyles, Menu, MenuItem, Theme, Toolbar } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import { authActions } from 'modules/auth/store/slice';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { setSidebarShow } from 'store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    header: {
      boxShadow: 'none',
    },
    toolbar: {
      padding: theme.spacing(0, 2),
      display: 'flex',
      justifyContent: 'space-between',
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4) - 4,
      height: theme.spacing(4) - 4,
    },
    box: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: "center",
    }
  })
);

export function TheHeader() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector((state) => state.root.sidebarShow);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authActions.LOGOUT())
  };

  return (
    <AppBar position="relative" color="transparent" className={classes.header}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => dispatch(setSidebarShow(!sidebarShow))}>
          { sidebarShow ? (<FormatIndentDecreaseIcon />) : (<FormatIndentIncreaseIcon />) }
          
        </IconButton>
        <Box className={classes.box}>
          <Avatar className={classes.orange}>N</Avatar>
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
