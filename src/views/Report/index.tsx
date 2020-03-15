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
import { StatsCalculator, PeriodType } from "../../types/statistics2";
import { useStatistics } from "../../redux/hooks/useStatistics"

interface Props {
}


const ReportView: React.FC<Props> = props => {
    const classes = useStyles();
    const items: Item[] = useSelector((state: ReduxState) => state.Items);
    console.log("items: ", items);

    const [date, setDate] = useState<Moment>(moment());
    const [periodType, setPriodType] = useState<PeriodType>(PeriodType.MONTH);
    // FIX
    /*const [statsValues, setStatsValues] = useState<StatsResult>(
        //items.calculator(date, PeriodType.DAY, content)
        new YearStatsBuilder(items, moment(), content).getResult()
    );*/

    const { calcStats, status, statsResult } = useStatistics()

    useEffect(() => {
        calcStats(date, periodType)
    }, [date])


    const createDateFormat = () => {
        switch (periodType) {
            case PeriodType.YEAR:
                return date.format("YYYY")
            case PeriodType.MONTH:
                return date.format("YYYY/MM")
            case PeriodType.DAY:
                return date.format("YYYY/MM/DD")
        }
    }


    const handleForwardDate = () => {
        console.log("forward", date)
        const datecp = date.clone()
        switch (periodType) {
            case PeriodType.YEAR:
                setDate(datecp.add(1, "year"));
                break
            case PeriodType.MONTH:
                setDate(datecp.add(1, "month"));
                break
            case PeriodType.DAY:
                setDate(datecp.add(1, "days"));
                break
        }
    };

    const handleBackDate = () => {
        const datecp = date.clone()
        switch (periodType) {
            case PeriodType.YEAR:
                setDate(datecp.subtract(1, "year"));
                break
            case PeriodType.MONTH:
                setDate(datecp.subtract(1, "month"));
                break
            case PeriodType.DAY:
                setDate(datecp.subtract(1, "days"));
                break
        }
    };
    const handleInitDate = () => {
        setDate(moment())
    };

    const handleChangePeriod = (period: PeriodType) => {
        setPriodType(period)
    };

    return (

        <MainLayout title="Report">
            <Grid className={classes.root} container>
                <Grid xs={12} sm={12} className={classes.date}>
                    <DateBar date={createDateFormat()} period={periodType} changePeriod={handleChangePeriod} initDate={handleInitDate} forwardDate={handleForwardDate} backDate={handleBackDate} />
                </Grid>
                <Grid xs={12} sm={12} className={classes.statistics}>
                    <Statistics statsResult={statsResult} />
                </Grid>
                <Grid xs={12} sm={12} className={classes.graph}>
                    <Graphs statsResult={statsResult} />
                </Grid>
            </Grid>
        </MainLayout>
    );
};


export default ReportView;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: "100%"
    },
    date: {
        backgroundColor: theme.palette.grey[100],
        height: "7%"
    },
    statistics: {
        backgroundColor: theme.palette.grey[100],
        height: "100%",
        marginTop: 20
    },
    graph: {
        backgroundColor: theme.palette.grey[100],
        height: "100%",
        marginTop: 20
    }
}));
