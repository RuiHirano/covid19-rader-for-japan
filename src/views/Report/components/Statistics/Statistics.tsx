import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import TotalAssets from "./TotalAssets";
import TotalProfit from "./TotalProfit";
import WinRate from "./WinRate";
import ProfitRatio from "./ProfitRatio";
import ExpectedValue from "./ExpectedValue";
import BankruptRate from "./BankruptRate";
import { ReportStats } from "../../ReportStats";

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
    stats: ReportStats;
}

const Statistics: React.FC<Props> = props => {
    const { stats } = props;
    //const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Grid container spacing={4}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalAssets />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <WinRate />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <ProfitRatio />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
                <ExpectedValue />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
                <BankruptRate />
            </Grid>
        </Grid>
    );
};

export default Statistics;
