import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
interface Props {
  title: string,
  text1: string,
  text2: string,
  text3: string,
}
interface State {}

const useStyles = makeStyles(theme => 
  createStyles({
  container: {
    display: 'flex',
  },
  sub_container: {
    display: 'flex',
    flexDirection: 'row',
  },
}));


const PlanCompareLayout: React.FC<Props> = props => {
  const { title, text1, text2, text3 } = props
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
      	<Typography variant="h6" className={"title"}>
            {title}
        </Typography>
        <Typography variant="h6" className={"text1"}>
            {text1}
        </Typography>
        <Typography variant="h6" className={"text2"}>
            {text2}
        </Typography>
        <Typography variant="h6" className={"texxt3"}>
            {text3}
        </Typography>
      </div>
        <Divider />
    </div>
 
  );
}

export default PlanCompareLayout;
