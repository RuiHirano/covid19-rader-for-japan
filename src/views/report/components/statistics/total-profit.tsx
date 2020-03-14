import React from "react";


import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100%"
    },
    content: {
        alignItems: "center",
        display: "flex"
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.secondary.dark,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: theme.spacing(2),
        display: "flex",
        alignItems: "center"
    },
    differenceIcon: {
        //color: theme.palette.success.dark
        color: theme.palette.secondary.dark
    },
    differenceValue: {
        //color: theme.palette.success.dark,
        color: theme.palette.secondary.dark,
        marginRight: theme.spacing(1)
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
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            TotalProfit
                        </Typography>
                        <Typography variant="h3">{totalProfit}</Typography>
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