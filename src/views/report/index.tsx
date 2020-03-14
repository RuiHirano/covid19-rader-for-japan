import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Calendar from "react-calendar";
import { width } from "@material-ui/system";
import { Grid, Button, Typography } from "@material-ui/core";
import { Graphs, Statistics, DateBar } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { StatsResult, Item, YearStatsBuilder } from "../../types";
import moment, { Moment } from "moment";
import { ReduxState } from "../../redux/module";
import { Main as MainLayout } from "../../layouts";

// Container
interface ContainerProps { }
const ReportContainer: React.FC<ContainerProps> = props => {
    const dispatch = useDispatch();
    const items: Item[] = useSelector((state: ReduxState) => state.Items);
    console.log("items: ", items);

    const content = useSelector(
        (state: ReduxState) => state.User.Setting.Content
    );

    const [date, setDate] = useState<Moment>(moment());
    // FIX
    const [statsValues, setStatsValues] = useState<StatsResult>(
        //items.calculator(date, PeriodType.DAY, content)
        new YearStatsBuilder(items, moment(), content).getResult()
    );

    useEffect(() => {
        // FIX
        //setStatsValues(items.calculator(date, PeriodType.DAY, content));
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

        <MainLayout title="Report">
            <Grid className={classes.root} container>
                <Grid xs={12} sm={12} className={classes.date}>
                    <DateBar date={date} changeDate={changeDate} />
                </Grid>
                <Grid xs={12} sm={12} className={classes.content}>
                    <Statistics statsValues={statsValues} />
                </Grid>
                <Grid xs={12} sm={12} className={classes.content}>
                    <Graphs statsValues={statsValues} />
                </Grid>
            </Grid>
        </MainLayout>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
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
        backgroundColor: theme.palette.grey[100],
        height: "7%"
    },
    content: {
        backgroundColor: theme.palette.grey[100],
        height: "100%"
    }
}));
