import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Grid, Button, Typography,
    IconButton,
    Paper,
    Tooltip
} from "@material-ui/core";
import moment, { Moment } from "moment";
import LeftIcon from "@material-ui/icons/ChevronLeft";
import RightIcon from "@material-ui/icons/ChevronRight";

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

    const handleBackDate = () => {
        console.log("back date")
    }
    const handleForwardDate = () => {
        console.log("forward date")
    }

    return (
        <Paper style={{ display: "flex" }}>
            <Button variant="outlined" style={{ height: 40 }}>{"今月"}</Button>
            <Tooltip title="前月">
                <IconButton
                    onClick={() => handleBackDate()}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <LeftIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="翌月">
                <IconButton
                    onClick={() => handleForwardDate()}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <RightIcon />
                </IconButton>
            </Tooltip>
            <Typography style={{ verticalAlign: "middle", display: "inline-block" }} variant={"h4"}>{date.format("YYYY/MM/DD")}</Typography>

        </Paper>

    );
};

export default DateBar;
