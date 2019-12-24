import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

interface Props {
  title: string,
  url: string,
  button1: string,
  button2: string,
}
interface State {}

const useStyles = makeStyles(theme => 
  createStyles({
  container: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const DownloadLayout: React.FC<Props>= props => {
  const classes = useStyles();
  const { title, url, button1, button2 } = props
  return (
    <div className={classes.container}>
		  <Typography variant="h6" className={"rate"}>
		    {title}
      </Typography>
      <Typography variant="h6" className={"description"}>
		    {url}
      </Typography>
      <Button variant="contained" color="primary" className={classes.button}>
        {button1}
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        {button2}
      </Button>
      <Divider />
    </div>
 
  );
}

export default DownloadLayout;
