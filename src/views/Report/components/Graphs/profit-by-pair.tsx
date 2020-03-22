import React from "react";


import { Bar } from "react-chartjs-2";
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
import { ChartData } from "chart.js";

import { options } from "./chart";
import { PairRatio } from "../../../../redux/hooks/useStatistics";

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

const createData = (profitByPairData: PairRatio[], theme: Theme) => {
    const labels: string[] = [];
    const values: number[] = [];
    profitByPairData.forEach((value, index) => {
        labels.push(value.Pair);
        values.push(value.Profit);
    });
    const data: ChartData = {
        labels: labels,
        datasets: [
            {
                label: "this",
                data: values,
                backgroundColor: "#3f51b5"
            }
        ]
    };
    return data;
};

interface Props {
    profitByPairData: PairRatio[];
}

const ProfitByPair: React.FC<Props> = props => {
    const { profitByPairData } = props;

    const classes = useStyles();
    const theme = useTheme();
    const data = createData(profitByPairData, theme);

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <CardHeader
                action={
                    <Button size="small" variant="text">
                        Last 7 days <ArrowDropDownIcon />
                    </Button>
                }
                title="Profit By Pair"
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

export default ProfitByPair;
