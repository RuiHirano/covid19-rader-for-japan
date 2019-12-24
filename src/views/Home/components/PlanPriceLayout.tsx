import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
interface Props {
  planName: string,
  subtext: string,
  price: string,
  benefits: string[],
}
interface State {}

const useStyles = makeStyles(theme => 
  createStyles({
  container: {
    display: 'flex',
  },
  sub_container: {
    display: 'flex',
  },
  benefit_container: {
    display: 'flex',
    flexDirection: 'row',
  },
}));


const PlanCompareLayout: React.FC<Props> = props => {
  const { planName, subtext, price, benefits } = props
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
      	<Typography variant="h3" className={"planName"}>
            {planName}
        </Typography>
        <Typography variant="h6" className={"subtext"}>
            {subtext}
        </Typography>
        <Typography variant="h3" className={"price"}>
            {"¥"+price}
        </Typography>
        <Typography variant="h6" className={"price_month"}>
            {"/ 月"}
        </Typography>
      </div>
      <Typography variant="h6" className={"planName"}>
          {planName + " Plan"}
      </Typography>
      <Divider />
      {benefits.map((benefit, index)=>(
        <div className={classes.benefit_container}>
          <Typography variant="h6" className={"index"}>
            {(index+1) + "."}
          </Typography>
          <Typography variant="h6" className={"benefit"}>
            {benefit}
          </Typography>
        </div>
      ))}
    </div>
 
  );
}

export default PlanCompareLayout;
