import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { useAppDispatch } from 'shared/hooks';
import { authActions, LoginPayload } from '../store/slice';

const useStyle = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh"
  },
  box: {
    padding: theme.spacing(3)
  }
}))

export default function Login () {

  const classes = useStyle()
  const dispatch = useAppDispatch()

  const submitForm = () => {
    const params: LoginPayload = {
      username: "",
      password: ""
    }

    dispatch(authActions.LOGIN(params))
  }

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1" >Student Managerment</Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" fullWidth onClick={submitForm}>Fake login</Button>
        </Box>
      </Paper>
    </div>
  );
}
