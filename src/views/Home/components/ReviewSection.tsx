import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Title from './Title'
import ReviewLayout from './ReviewLayout'

interface Props {
}
interface State {}

const useStyles = makeStyles(theme => 
  createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  review_container: {
    display: 'flex',
    flexDirection: 'row',
  },
}));


const ReviewSection: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      	<Title title={"レビュー"} color={"#FFFFFF"}/>
		    <Typography variant="h6" className={"description"}>
		      嬉しいお声をたくさんいただいております！
        </Typography>
        <div className={classes.review_container}>
        <ReviewLayout
          rate={5}
          text={"とても使いやすく、トレーダーしてんの定型化されたフォーマットでビジュアル的にもとても良いです。今後も使い続けたいと思います。"}
        />
        <ReviewLayout
          rate={5}
          text={"レビュー募集中です！"}
        />
        <ReviewLayout
          rate={5}
          text={"レビュー募集中です！"}
        />
        </div>
        <Divider />
    </div>
 
  );
}

export default ReviewSection;
