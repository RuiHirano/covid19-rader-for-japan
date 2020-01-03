import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
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
    profitData: TransitionPoint[];
}

const createData = (totalAssetsData: TransitionPoint[]) => {
    const labels: string[] = [];
    const values: number[] = [];
    totalAssetsData.forEach((value, index) => {
        labels.push((index + 1).toString());
        values.push(value.Value);
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

const ProfitTransition: React.FC<Props> = props => {
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
                title="Profit Transition"
            />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Line data={data} options={options} />
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

export default ProfitTransition;
