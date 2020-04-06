import React from "react";
import { Grid, colors } from "@material-ui/core";
import StatsPaper from "./stats-paper";
import Warning from "./warning";


interface Props {
}

const StatsBoard: React.FC<Props> = props => {

    return (
        <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Warning />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <StatsPaper title={"感染者数"} totalValue={"46500"} dateValue={"+3436"} color={colors.yellow[900]} />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <StatsPaper title={"検査人数"} totalValue={"46500"} dateValue={"+3436"} color={colors.green[800]} />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <StatsPaper title={"退院者数"} totalValue={"46500"} dateValue={"+3436"} color={colors.blue[800]} />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <StatsPaper title={"死亡者数"} totalValue={"46500"} dateValue={"+3436"} color={colors.deepOrange[800]} />
            </Grid>
        </Grid>

    );
};

export default StatsBoard;
