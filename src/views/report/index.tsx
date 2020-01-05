import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Calendar from "react-calendar";
import { width } from "@material-ui/system";
import { Grid, Button, Typography } from "@material-ui/core";
import { Graphs, Statistics, DateBar } from "./components";
import { AppState } from "../../redux/module";
import { useSelector, useDispatch } from "react-redux";
import { PeriodType, Items, StatsResult } from "../../types";
import moment, { Moment } from "moment";

// Container
interface ContainerProps {}
const ReportContainer: React.FC<ContainerProps> = props => {
    const dispatch = useDispatch();
    const items: Items = useSelector((state: AppState) => state.Items);
    console.log("items: ", items);

    const content = useSelector(
        (state: AppState) => state.User.Setting.Content
    );

    const [date, setDate] = useState<Moment>(moment());
    const [statsValues, setStatsValues] = useState<StatsResult>(
        items.calculator(date, PeriodType.DAY, content)
    );

    useEffect(() => {
        setStatsValues(items.calculator(date, PeriodType.DAY, content));
    }, [date]);

    const changeDate = (nextDate: Moment) => {
        setDate(nextDate);
    };

    return (
        <ReportView
            statsValues={statsValues}
            date={date}
            changeDate={changeDate}
        />
    );
};

export default ReportContainer;

interface Props {
    statsValues: StatsResult;
    date: Moment;
    changeDate: (date: Moment) => void;
}

const ReportView: React.FC<Props> = props => {
    const { statsValues, date, changeDate } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid className={classes.root} container>
                <Grid xs={12} sm={12} className={classes.date}>
                    <DateBar date={date} changeDate={changeDate} />
                </Grid>
                <Grid xs={12} sm={12} className={classes.content}>
                    <Statistics statsValues={statsValues} />
                    <Graphs statsValues={statsValues} />
                </Grid>
            </Grid>
        </div>
    );
};

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
    date: {
        backgroundColor: theme.palette.common.white,
        height: "7%"
    },
    content: {
        backgroundColor: theme.palette.common.white,
        height: "100%"
    }
}));
