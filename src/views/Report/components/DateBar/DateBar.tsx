import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import { Moment } from "moment";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        height: "100%"
    },
    tile: {
        backgroundColor: theme.palette.common.white,
        height: 125
    },
    detail: {
        height: "100%",
        display: "flex",
        backgroundColor: theme.palette.common.white
    },
    button: {
        backgroundColor: theme.palette.common.white,
        height: "100%"
    },
    date: {
        backgroundColor: theme.palette.common.white,
        height: "100%"
    }
}));

interface Props {
    date: Moment;
}

const DateBar: React.FC<Props> = props => {
    const { date } = props;
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={3} lg={3} xl={3} className={classes.button}>
                <Button>{"<"}</Button>
            </Grid>
            <Grid item xs={12} sm={6} lg={6} xl={6} className={classes.date}>
                <Typography>2019/09/20</Typography>
            </Grid>
            <Grid item xs={12} sm={3} lg={3} xl={3} className={classes.button}>
                <Button>{">"}</Button>
            </Grid>
        </Grid>
    );
};

export default DateBar;
