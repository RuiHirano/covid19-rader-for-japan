import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
            <Typography variant="h1">
              Here is Home
            </Typography>
    </div>
  );
};

export default Home;
