import React from "react";


import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Avatar, Paper } from "@material-ui/core";
import TotalAssets from "./total-assets";
import TotalProfit from "./total-profit";
import WinRate from "./win-rate";
import ProfitRatio from "./profit-ratio";
import ExpectedValue from "./expected-value";
import BankruptRate from "./bankrupt-rate";
import { StatsResult } from "../../../../types";

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
    statsValues: StatsResult;
}

const Statistics: React.FC<Props> = props => {
    const { statsValues } = props;
    console.log("statistics: ", statsValues);
    //const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <div >
            <Typography style={{}} variant={"subtitle1"}>{"Statistics"}</Typography>
            <Paper style={{ padding: 10 }}>
                <Grid container spacing={2}>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <TotalAssets totalAssets={statsValues.Statistics.TotalAssets} />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <TotalProfit totalProfit={statsValues.Statistics.TotalProfit} />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <WinRate winRate={statsValues.Statistics.WinRate} />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <ProfitRatio profitRatio={statsValues.Statistics.ProfitRatio} />
                    </Grid>
                    <Grid item lg={3} md={6} xl={3} xs={12}>
                        <ExpectedValue
                            expectedValue={statsValues.Statistics.ProfitAve}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} xl={3} xs={12}>
                        <BankruptRate
                            bankruptRate={statsValues.Statistics.ProfitBefore}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default Statistics;
