import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none'
  },
  button: {
    margin: theme.spacing(1),
  },
}));

interface Props{
  className?: string,
}

const Topbar: React.FC<Props>  = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Trading Manager"
            src="./../../../../../public/app_icon.png"
          />
        </RouterLink>
        <RouterLink to="/sign-in">
        <Button　color="default" variant="contained" className={classes.button}>コンソールへ移動</Button>
        </RouterLink>
        <RouterLink to="/sign-up">
        <Button　color="default" variant="contained" className={classes.button}>新規登録</Button>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};


export default Topbar;
