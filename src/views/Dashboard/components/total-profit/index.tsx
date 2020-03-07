import React from "react";


import { makeStyles, Theme} from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    content: {
        alignItems: "center",
        display: "flex"
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    }
}));

interface Props {
    totalProfit: number;
}

const TotalProfit: React.FC<Props> = props => {
    const { totalProfit } = props;

    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="inherit"
                            gutterBottom
                            variant="body2"
                        >
                            TotalProfit
                        </Typography>
                        <Typography color="inherit" variant="h3">
                            {totalProfit}
                        </Typography>
                    </Grid>
                    {/*<Grid item>
                        <Avatar className={classes.avatar}>
                            <PeopleIcon className={classes.icon} />
                        </Avatar>
					</Grid>*/}
                </Grid>
                {/*<div className={classes.difference}>
                    <ArrowUpwardIcon className={classes.differenceIcon} />
                    <Typography
                        className={classes.differenceValue}
                        variant="body2"
                    >
                        16%
                    </Typography>
                    <Typography
                        //className={classes.caption}
                        variant="caption"
                    >
                        Since last month
                    </Typography>
                </div>*/}
            </CardContent>
        </Card>
    );
};

export default TotalProfit;
