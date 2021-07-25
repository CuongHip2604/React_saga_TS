import { Box, makeStyles } from '@material-ui/core';
import React, { Suspense } from 'react';
import {
   Redirect,
   Route,
   Switch
 } from 'react-router-dom'
import routes from 'router/routes';

const useStyle = makeStyles(theme => ({
   root: {
      padding: theme.spacing(2),
      minHeight: `calc(100% - ${theme.spacing(6) + 2}px)`
   }
}))

const loading = (
   <div className="pt-3 text-center">
     <div className="sk-spinner sk-spinner-pulse"></div>
   </div>
 )

export function TheContent() {

   const classes = useStyle()

   return (
      <Box className={classes.root}>
         <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={props => (
                      <route.component {...props} />
                  )} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </Box>
   );
}