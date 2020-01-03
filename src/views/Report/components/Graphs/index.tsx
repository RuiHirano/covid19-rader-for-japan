import React from "react";
import {
    makeStyles,
    Theme,
    useTheme
} from "@material-ui/core/styles";
import {
    Grid
} from "@material-ui/core";
import TotalAssets from "./total-assets";
import ProfitTransition from "./profit-transition";
import ProfitByDate from "./profit-by-date";
import ProfitByPair from "./profit-by-pair";
import TradeNumByPair from "./trade-num-by-pair";
import TradeNumByClass from "./trade-num-by-class";
import { StatsResult } from "../../../../types";

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
                    <ProfitTransition
                        profitData={statsValues.Graphs.ProfitTransition}
                    />
                </Grid>
                <Grid item lg={6} sm={6} xl={3} xs={12}>
                    <ProfitByDate />
                </Grid>
                <Grid item lg={6} sm={6} xl={3} xs={12}>
                    <ProfitByPair
                        profitByPairData={statsValues.Graphs.PairRatio}
                    />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <TradeNumByPair
                        tradeNumByPairData={statsValues.Graphs.PairRatio}
                    />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <TradeNumByClass
                        tradeNumByClassData={statsValues.Graphs.TradeTypeRatio}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Graphs;
