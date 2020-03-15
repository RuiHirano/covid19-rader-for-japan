import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { Grid, Typography, Paper } from "@material-ui/core";
import TotalAssets from "./total-assets";
import ProfitTransition from "./profit-transition";
import ProfitByDate from "./profit-by-date";
import ProfitByPair from "./profit-by-pair";
import TradeNumByPair from "./trade-num-by-pair";
import TradeNumByClass from "./trade-num-by-class";
import { StatsResult } from "../../../../redux/hooks/useStatistics";

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
    statsResult: StatsResult;
}

const Graphs: React.FC<Props> = props => {
    const { statsResult } = props;

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div >
            <Typography style={{ margin: 5 }} variant={"h6"}>{"Graph"}</Typography>
            <Paper style={{ padding: 10 }} elevation={0}>
                <Grid container spacing={2}>
                    <Grid item lg={6} sm={6} xl={3} xs={12}>
                        <TotalAssets
                            totalAssetsData={
                                statsResult.Graphs.TotalAssetsTransition
                            }
                        />
                    </Grid>
                    <Grid item lg={6} sm={6} xl={3} xs={12}>
                        <ProfitTransition
                            profitData={statsResult.Graphs.ProfitTransition}
                        />
                    </Grid>
                    {/*<Grid item lg={6} sm={6} xl={3} xs={12}>
                    <ProfitByDate />
					</Grid>*/}
                    <Grid item lg={6} sm={6} xl={3} xs={12}>
                        <ProfitByPair
                            profitByPairData={statsResult.Graphs.PairRatio}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} xl={3} xs={12}>
                        <TradeNumByPair
                            tradeNumByPairData={statsResult.Graphs.PairRatio}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} xl={3} xs={12}>
                        <TradeNumByClass
                            tradeNumByClassData={statsResult.Graphs.TradeTypeRatio}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default Graphs;
