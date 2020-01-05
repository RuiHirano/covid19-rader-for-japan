import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import moment, { Moment } from "moment";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        height: "100%",
        width: "100%",
        paddingBottom: 20
    },
    left_button: {
        backgroundColor: theme.palette.common.white,
        textAlign: "left",
        height: "100%"
    },
    right_button: {
        backgroundColor: theme.palette.common.white,
        textAlign: "right",
        height: "100%"
    },
    date: {
        backgroundColor: theme.palette.common.white,
        textAlign: "center",
        alignSelf: "center",
        fontSize: 20,
        height: "100%"
    }
}));

interface Props {
    date: Moment;
    changeDate: (date: Moment) => void;
}

const DateBar: React.FC<Props> = props => {
    const { date, changeDate } = props;
    const classes = useStyles();
    const date2: Moment = moment(date);

    return (
        <Grid container className={classes.root}>
            <Grid
                item
                xs={12}
                sm={3}
                lg={3}
                xl={3}
                className={classes.left_button}
            >
                <Button onClick={() => changeDate(date2.subtract(1, "days"))}>
                    {"<"}
                </Button>
            </Grid>
            <Grid item xs={12} sm={6} lg={6} xl={6} className={classes.date}>
                <Typography>{date.format("YYYY/MM/DD")}</Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={3}
                lg={3}
                xl={3}
                className={classes.right_button}
            >
                <Button onClick={() => changeDate(date2.add(1, "days"))}>
                    {">"}
                </Button>
            </Grid>
        </Grid>
    );
};

export default DateBar;
