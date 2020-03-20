import React from "react";


import { Bar } from "react-chartjs-2";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button
} from "@material-ui/core";
import { ChartData } from "chart.js";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { options } from "./chart";
import { TransitionPoint } from "../../../../types";

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
    profitData: number[];
}

const createData = (totalAssetsData: number[]) => {
    const labels: string[] = [];
    const values: number[] = [];
    totalAssetsData.forEach((value, index) => {
        labels.push((index + 1).toString());
        values.push(value);
    });
    const data: ChartData = {
        labels: labels,
        datasets: [
            {
                label: "this",
                backgroundColor: "#3f51b5",
                data: values
            }
        ]
    };
    return data;
};

const LatestProfit: React.FC<Props> = props => {
    const { profitData } = props;

    const classes = useStyles();
    const data = createData(profitData);

    return (
        <Card>
            <CardHeader
                action={
                    <Button size="small" variant="text">
                        Last 7 days <ArrowDropDownIcon />
                    </Button>
                }
                title="Latest Profit"
            />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Bar data={data} options={options} />
                </div>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <Button color="primary" size="small" variant="text">
                    Overview <ArrowRightIcon />
                </Button>
            </CardActions>
        </Card>
    );
};

export default LatestProfit;
