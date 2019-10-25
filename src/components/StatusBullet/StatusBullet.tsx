import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display: 'inline-block',
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0
  },
  sm: {
    height: theme.spacing(1),
    width: theme.spacing(1)
  },
  md: {
    height: theme.spacing(2),
    width: theme.spacing(2)
  },
  lg: {
    height: theme.spacing(3),
    width: theme.spacing(3)
  },
  neutral: {
    backgroundColor: theme.palette.primary.light
  },
  primary: {
    backgroundColor: theme.palette.primary.main
  },
  info: {
    backgroundColor: theme.palette.primary.light
  },
  warning: {
    backgroundColor: theme.palette.error.light
  },
  danger: {
    backgroundColor: theme.palette.error.main
  },
  success: {
    backgroundColor: theme.palette.primary.light
  }
}));

interface Props{
  className: string,
  color: 
    'neutral' |
    'primary' |
    'info' |
    'success' |
    'warning' |
    'danger',
  size: 'sm' | 'md' | 'lg',
}

const StatusBullet: React.FC<Props> = props => {
  const { className, size, color, ...rest } = props;

  const classes = useStyles();

  return (
    <span
      {...rest}
      className={clsx(
        {
          [classes.root]: true,
          [classes[size]]: size,
          [classes[color]]: color
        },
        className
      )}
    />
  );
};

export default StatusBullet;
