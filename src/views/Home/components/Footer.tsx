import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
interface Props {
}
interface State {}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      	<Typography variant="h2" className={"title"}>
            FelixPort.Inc
        </Typography>
		<Typography variant="h6" className={"description"}>
		より便利に、より幸せに。
        </Typography>
        <Divider />
    </div>
 
  );
}

export default Footer;
