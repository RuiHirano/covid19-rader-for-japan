import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

interface Props {
  rate: number,
  text: string
}
interface State {}

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const ReviewLayout: React.FC<Props>= props => {
  const classes = useStyles();
  const { rate, text } = props
  return (
    <div className={classes.container}>
		  <Typography variant="h6" className={"rate"}>
		    {String(rate) + " /5"}
      </Typography>
      <Typography variant="h6" className={"description"}>
		    {text}
      </Typography>
      <Divider />
    </div>
 
  );
}

export default ReviewLayout;
