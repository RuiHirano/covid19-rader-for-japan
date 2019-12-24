import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
interface Props {
  title: string,
  color: string,
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


const Title: React.FC<Props> = (props) => {
  const { title, color } = props
  const classes = useStyles();
  return (
    <Typography variant="h2" className={"title"}>
            {title}
    </Typography>
  );
}

export default Title;
