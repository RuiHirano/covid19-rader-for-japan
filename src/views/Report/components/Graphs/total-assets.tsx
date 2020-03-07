import React from "react";


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
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { options } from "./chart";
import { ChartData } from "chart.js";
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
    totalAssetsData: TransitionPoint[];
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

const TotalAssets: React.FC<Props> = props => {
    const { totalAssetsData } = props;
    //console.log("data: ", data);

    const data = createData(totalAssetsData);

    const classes = useStyles();

    return (
        <Card>
            <CardHeader
                action={
                    <Button size="small" variant="text">
                        Last 7 days <ArrowDropDownIcon />
                    </Button>
                }
                title="Total Assets"
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

export default TotalAssets;
