import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

interface Props {
  isRight: boolean,
  title: string,
  text: string,
}
interface State {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    sub_container: {
      display: 'flex',
      flexDirection: 'row',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);


const FeatureLayout: React.FC<Props> = props => {
  const { isRight, title, text } = props
  const classes = useStyles();
  const theme = useTheme();
  if (isRight){ 
  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
      <div className={classes.details}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {text}
          </Typography>
      </div>
      <img src={"/app_icon2.png"}/>
    </div>
    <Divider />
    </div>
  );
  }else{
    return(
    <div className={classes.container}>
    <div className={classes.sub_container}>
      <img src={"/app_icon2.png"}/>
      <div className={classes.details}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {text}
          </Typography>
      </div>
    </div>
    <Divider />
    </div>
    )
  }
}

export default FeatureLayout;
