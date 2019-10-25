import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  iframe: {
    width: '100%',
    minHeight: 640,
    border: 0
  }
}));

const Icons: React.FC  = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <iframe
        className={classes.iframe}
        src="https://material.io/tools/icons/?icon=accessibility&style=outline"
        title="Material Design icons"
      />
    </div>
  );
};

export default Icons;
