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


const HeaderTitle: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      	<Typography variant="h2" className={"title"}>
            Trading Manager
        </Typography>
		<Typography variant="h6" className={"description"}>
		あなたの日々のFXや株、仮想通貨取引を記録し、自動的に分析をします。
		過去の取引を振り返ることで、効率よくトレードの質をあげることができます。
        </Typography>
        <Divider />
    </div>
 
  );
}

export default HeaderTitle;
