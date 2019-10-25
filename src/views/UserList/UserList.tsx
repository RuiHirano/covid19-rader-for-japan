import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList: React.FC = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
