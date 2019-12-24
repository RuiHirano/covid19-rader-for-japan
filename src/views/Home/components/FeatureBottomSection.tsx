import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FeatureLayout from './FeatureLayout'
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


const FeatureBottomSection: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <FeatureLayout
          isRight={true}
          title={"まずはダウンロード。"}
          text={"モバイル版は App Store, Google Playで、Web版はMicrosoft Store, Mac App Storeでダウンロードが可能です。"}
        />
        <FeatureLayout
          isRight={false}
          title={"無料体験をしよう。"}
          text={"Standard, Premium プランは1ヶ月の無料体験期間を楽しむことができます。プランのキャンセルは、簡単にすぐ行えます。解約金などは一切ございません。"}
        />
    </div>
 
  );
}

export default FeatureBottomSection;
