import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Calendar from "react-calendar";
import { width } from "@material-ui/system";
import { Grid, Button, Typography } from "@material-ui/core";
import { Graphs, Statistics, DateBar } from "./components";
import { AppState } from "../../redux/module/rootModule";
import { useSelector, useDispatch } from "react-redux";
import { PeriodType } from "../../types";
import { ReportStats } from "./ReportStats";
import moment from "moment";

// Container
interface ContainerProps {}
const ReportContainer: React.FC<ContainerProps> = props => {
    const dispatch = useDispatch();
    const items = useSelector((state: AppState) => state.Items);
    console.log("items: ", items);

    /*const { isLoading, isFinishLoading } = useLoading(
        LoadingState.UPDATE_PASSWORD
    );
    useEffect(() => {
        if (isFinishLoading) {
            //history.push("/dashboard");
        }
    }, [isLoading]);*/

    return <ReportView />;
};

export default ReportContainer;

interface Props {}

const ReportView: React.FC<Props> = props => {
    const {} = props;
    const classes = useStyles();

    const items = useSelector((state: AppState) => state.Items);
    const content = useSelector(
        (state: AppState) => state.User.Setting.Content
    );
    const [date, setDate] = useState(moment());

    const [stats, setStats] = useState(
        new ReportStats(
            items,
            PeriodType.MONTH,
            date,
            content.InitialInvestment,
            content.AllowableLossRate,
            content.BankruptcyReductionRate
        )
    );

    return (
        <div className={classes.root}>
            <Grid className={classes.root} container>
                <Grid xs={12} sm={12} className={classes.date}>
                    <DateBar date={date} />
                </Grid>
                <Grid xs={12} sm={12} className={classes.content}>
                    <Statistics stats={stats} />
                    <Graphs stats={stats} />
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
