import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import * as React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import StatisticItem from './components/StatisticItem';
import StudentRanking from './components/StudentRanking';
import Widget from './components/Widget';
import { dashboardActions } from './store/slice';

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 0),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function Dashboard() {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const statistics = useAppSelector((state) => state.dashboard.statistics);
  const highestStudents = useAppSelector((state) => state.dashboard.highestStudents);
  const lowestStudents = useAppSelector((state) => state.dashboard.lowestStudents);
  const rankingByCity = useAppSelector((state) => state.dashboard.rankingByCity);
  const loading = useAppSelector((state) => state.dashboard.loading);

  const listSatistic = [
    {
      label: 'Male',
      icon: <PeopleAltRoundedIcon fontSize="large" color="primary" />,
      value: statistics.maleCount,
    },
    {
      label: 'Female',
      icon: <PeopleAltRoundedIcon fontSize="large" color="primary" />,
      value: statistics.femaleCount,
    },
    {
      label: 'Mark greater than 8',
      icon: <PeopleAltRoundedIcon fontSize="large" color="primary" />,
      value: statistics.highMarkCount,
    },
    {
      label: 'Mark less than 5',
      icon: <PeopleAltRoundedIcon fontSize="large" color="primary" />,
      value: statistics.lowMarkCount,
    },
  ];

  useEffect(() => {
    dispatch(dashboardActions.GET_DASHBOARD());
  }, [dispatch]);

  useEffect(() => {}, [statistics]);

  return (
    <Box className={classes.root}>
      {/* loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* statistic section */}
      <Grid container spacing={3}>
        {listSatistic.map((statistic, idx) => (
          <Grid item xs={12} md={6} lg={3} key={idx}>
            <StatisticItem icon={statistic.icon} label={statistic.label} value={statistic.value} />
          </Grid>
        ))}
      </Grid>

      {/* All student ranking */}
      <Box mt={3}>
        <Typography variant="h6">All students ranking</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Widget title="Student with highest mark">
                <StudentRanking students={highestStudents} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6}>
              <Widget title="Student with lowest mark">
                <StudentRanking students={lowestStudents} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* ranking by city */}
      <Box mt={3}>
        <Typography variant="h6">Ranking by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {
              rankingByCity.map((el, idx) => (
                <Grid item xs={12} md={6} lg={3} key={idx}>
                  <Widget title={el.cityName}>
                    <StudentRanking students={el.rankings} />
                  </Widget>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
