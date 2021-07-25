import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles(theme => ({
   root: {
      borderTop: `1px solid ${theme.palette.divider}`,
      height: theme.spacing(6) + 2,
      display: 'flex',
      alignItems: "center",
      padding: theme.spacing(2)
   }
}))

export function TheFooter() {

   const classes = useStyle()

   return (
      <Box className={classes.root}>
         The Footer
      </Box>
   );
}