import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Title from './Title'
import DownloadLayout from './DownloadLayout'
interface Props {
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const DownloadSection: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      	<Title title={"ダウンロード"} color={"#FFFFFF"}/>
        <div className={classes.sub_container}>
          <DownloadLayout
            title={"Mobile"}
            url={""}
            button1={"GooglePlayで手に入れよう"}
            button2={"App Storeからダウンロード"}
          />
          <DownloadLayout
            title={"PC/Mac"}
            url={""}
            button1={"Mac App Storeからダウンロード"}
            button2={"Microsoft Storeからダウンロード"}
          />
        </div>
        <Divider />
    </div>
 
  );
}

export default DownloadSection;
