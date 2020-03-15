import React from "react";


import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Avatar, Paper } from "@material-ui/core";
import TotalAssets from "./total-assets";
import TotalProfit from "./total-profit";
import WinRate from "./win-rate";
import ProfitRatio from "./profit-ratio";
import ExpectedValue from "./expected-value";
import BankruptRate from "./bankrupt-rate";
import { StatsResult } from "../../../../redux/hooks/useStatistics";

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
    statsResult: StatsResult;
}

const Statistics: React.FC<Props> = props => {
    const { statsResult } = props;
    console.log("statistics: ", statsResult);
    //const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <div >
            <Typography style={{ margin: 5 }} variant={"h6"}>{"Statistics"}</Typography>
            <Paper style={{ padding: 10 }} elevation={0}>
                <Grid container spacing={2}>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <TotalAssets totalAssets={statsResult.Statistics.TotalAssets} />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <TotalProfit totalProfit={statsResult.Statistics.TotalProfit} />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <WinRate winRate={statsResult.Statistics.WinRate} />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <ProfitRatio profitRatio={statsResult.Statistics.ProfitRatio} />
                    </Grid>
                    <Grid item lg={3} md={6} xl={3} xs={12}>
                        <ExpectedValue
                            expectedValue={statsResult.Statistics.ProfitAve}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} xl={3} xs={12}>
                        <BankruptRate
                            bankruptRate={statsResult.Statistics.ProfitBefore}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default Statistics;
