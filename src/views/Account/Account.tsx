import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
