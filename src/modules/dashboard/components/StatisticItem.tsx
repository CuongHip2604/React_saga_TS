import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface StatisticItemProps {
   icon: React.ReactElement;
   label: string;
   value: number | string;
}

const useStyle = makeStyles(theme => ({
   root: {
      padding: theme.spacing(2),
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "space-between",
      alignItems: "center",
   }
}))

export default function StatisticItem ({ icon, value, label }: StatisticItemProps) {

   const classes = useStyle()

  return (
    <Paper className={classes.root}>
       <Box>
          { icon }
       </Box>
       <Box>
          <Typography variant='h5' align="right">{value}</Typography>
          <Typography variant='caption'>{label}</Typography>
       </Box>
    </Paper>
  );
}
