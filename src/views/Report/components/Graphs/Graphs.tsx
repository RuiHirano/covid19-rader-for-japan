import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { ChartData, ChartOptions } from "chart.js";
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Divider,
    Typography,
    createStyles,
    Grid
} from "@material-ui/core";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import RefreshIcon from "@material-ui/icons/Refresh";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import TotalAssets from "./TotalAssets";
import ProfitTransition from "./ProfitTransition";
import ProfitByDate from "./ProfitByDate";
import ProfitByPair from "./ProfitByPair";
import TradeNumByPair from "./TradeNumByPair";
import TradeNumByClass from "./TradeNumByClass";
import moment from "moment";
import { PeriodType, StatsResult } from "../../../../types";
import { ReportStats } from "../../ReportStats";
import { AppState } from "../../../../redux/module/rootModule";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100%"
    },
    chartContainer: {
        position: "relative",
        height: "300px"
    },
    stats: {
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "center"
    },
    device: {
        textAlign: "center",
        padding: theme.spacing(1)
    },
    deviceIcon: {
        //color: theme.palette.icon
        //color: theme.palette.background
    }
}));

interface Props {
    statsValues: StatsResult;
}

const Graphs: React.FC<Props> = props => {
    const { statsValues } = props;
    console.log("graph: ", statsValues);

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item lg={6} sm={6} xl={3} xs={12}>
                    <TotalAssets
                        totalAssetsData={
                            statsValues.Graphs.TotalAssetsTransition
                        }
                    />
                </Grid>
                <Grid item lg={6} sm={6} xl={3} xs={12}>
                    <ProfitTransition profitData={
                            statsValues.Graphs.ProfitTransition
                        }/>
                </Grid>
                <Grid item lg={6} sm={6} xl={3} xs={12}>
                    <ProfitByDate />
                </Grid>
                <Grid item lg={6} sm={6} xl={3} xs={12}>
                    <ProfitByPair profitByPairData={statsValues.Graphs.PairRatio}/>
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <TradeNumByPair tradeNumByPairData={statsValues.Graphs.PairRatio}/>
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <TradeNumByClass tradeNumByClassData={statsValues.Graphs.TradeTypeRatio}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Graphs;
