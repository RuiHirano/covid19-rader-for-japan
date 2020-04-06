import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    Paper,
    Typography,
} from "@material-ui/core";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Bar } from "recharts";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/module";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    chartContainer: {
        height: 400,
        position: "relative"
    },
    actions: {
        justifyContent: "flex-end"
    }
}));


interface Props {
    title: string
    totalValue: string //総計
    dateValue: string // 日毎の値
    color: string
}

const StatsPaper: React.FC<Props> = props => {
    const { title, totalValue, dateValue, color } = props

    return (
        <Paper style={{ backgroundColor: color, padding: 10 }}>
            <div style={{ display: "flex" }}>
                <Typography style={{ fontSize: 20, color: "white", marginLeft: 10 }}>{title}</Typography>
                <Typography style={{ fontSize: 20, color: "white", marginLeft: 10 }}>{dateValue}</Typography>
            </div>
            <Typography style={{ fontSize: 55, color: "white", paddingLeft: 10 }}>{totalValue}</Typography>
        </Paper>
    );
};

export default StatsPaper;
