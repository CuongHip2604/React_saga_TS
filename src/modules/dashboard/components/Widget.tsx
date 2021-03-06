import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface WidgetProps {
   title: string;
   children: any;
}

const useStyle = makeStyles(theme => ({
   root: {
      padding: theme.spacing(2),
   }
}))

export default function Widget ({ title, children }: WidgetProps) {

   const classes = useStyle()

  return (
    <Paper className={classes.root}>
       <Typography variant="button" >{title}</Typography>
       <Box mt={2}>
          { children }
       </Box>
    </Paper>
  );
}
