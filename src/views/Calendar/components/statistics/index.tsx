import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { Moment } from "moment";
import { Item, StatsResult } from "../../../../types";

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
        height: "80%",
        display: "flex",
        backgroundColor: theme.palette.common.white
    },
    statistics: {
        backgroundColor: theme.palette.common.black,
        height: "20%"
    },
    calendar: {
        backgroundColor: theme.palette.common.white,
        height: "100%",
        width: "100%"
    }
}));

interface Props {
    date: Moment;
    stats: StatsResult;
}

const Statistics: React.FC<Props> = props => {
    const { stats } = props;
    const classes = useStyles();

    return (
        <div>
            <Typography>{"勝率： " + stats.Statistics.WinRate}</Typography>
            <Typography>
                {stats.Statistics.ProfitRatio == Infinity
                    ? "損益率： ---"
                    : "損益率： " + stats.Statistics.ProfitRatio}
            </Typography>
            <Typography>
                {"総損益： " + stats.Statistics.TotalProfitAndLoss}
            </Typography>
            <Typography>
                {"トレード回数： " + stats.Statistics.NumTrade}
            </Typography>
        </div>
    );
};

export default Statistics;
