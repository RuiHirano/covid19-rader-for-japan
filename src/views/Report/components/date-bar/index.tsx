import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Grid, Button, Typography,
    IconButton,
    Paper,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import moment, { Moment } from "moment";
import LeftIcon from "@material-ui/icons/ChevronLeft";
import RightIcon from "@material-ui/icons/ChevronRight";
import { PeriodType } from "../../../../redux/hooks/useStatistics";

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
    date: string;
    period: PeriodType
    forwardDate: () => void;
    backDate: () => void
    initDate: () => void
    changePeriod: (period: PeriodType) => void
}

const createTitleName = (period: PeriodType) => {
    switch (period) {
        case PeriodType.YEAR:
            return "今年"
        case PeriodType.MONTH:
            return "今月"
        case PeriodType.DAY:
            return "今日"
    }
}

const DateBar: React.FC<Props> = props => {
    const { date, forwardDate, backDate, initDate, changePeriod, period } = props;

    return (
        <Paper style={{ display: "flex", padding: 5 }} elevation={0}>
            <Button variant="outlined" style={{ height: 40 }} onClick={() => initDate()}>{createTitleName(period)}</Button>
            <Tooltip title="前月">
                <IconButton
                    onClick={() => backDate()}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <LeftIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="翌月">
                <IconButton
                    onClick={() => forwardDate()}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <RightIcon />
                </IconButton>
            </Tooltip>
            <Typography style={{ verticalAlign: "middle", display: "inline-block", flexGrow: 1 }} variant={"h4"}>{date}</Typography>
            <FormControl variant="outlined" >
                <Select
                    defaultValue={PeriodType.MONTH}
                    onChange={(e) => changePeriod(e.target.value as PeriodType)}
                //labelWidth={labelWidth}
                >
                    <MenuItem value={PeriodType.YEAR}>Year</MenuItem>
                    <MenuItem value={PeriodType.MONTH}>Month</MenuItem>
                    <MenuItem value={PeriodType.DAY}>Day</MenuItem>
                </Select>
            </FormControl>

        </Paper>

    );
};

export default DateBar;
