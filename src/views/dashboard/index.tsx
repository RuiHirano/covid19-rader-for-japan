import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import {
    TotalAssets,
    ProfitRatio,
    WinRate,
    TotalProfit,
    LatestProfit,
    TradesByPair,
    LatestOrders,
    LatestCalendar
} from "./components";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../redux/module";
import { StatsResult, Item, YearStatsBuilder } from "../../types";
import moment from "moment";
import { Main as MainLayout } from "../../layouts";
// Container
interface ContainerProps { }
const DashboardContainer: React.FC<ContainerProps> = props => {
    const dispatch = useDispatch();
    const items: Item[] = useSelector((state: ReduxState) => state.Items);
    console.log("items: ", items);

    const content = useSelector(
        (state: ReduxState) => state.User.Setting.Content
    );

    //FIX
    const [statsValues, setStatsValues] = useState<StatsResult>(
        //items.calculator(moment(), PeriodType.ALL, content)
        new YearStatsBuilder(items, moment(), content).getResult()
    );

    return <DashboardView statsValues={statsValues} items={items} />;
};

export default DashboardContainer;

interface Props {
    statsValues: StatsResult;
    items: Item[];
}

const DashboardView: React.FC<Props> = props => {
    const { statsValues, items } = props;

    return (
        <MainLayout title="Dashboard">
            <Grid container spacing={2}>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                    <TotalAssets
                        totalAssets={statsValues.Statistics.TotalAssets}
                    />
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                    <ProfitRatio
                        profitRatio={statsValues.Statistics.ProfitRatio}
                    />
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                    <WinRate winRate={statsValues.Statistics.WinRate} />
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                    <TotalProfit
                        totalProfit={statsValues.Statistics.TotalProfit}
                    />
                </Grid>
                <Grid item xl={9} lg={8} md={12} sm={12} xs={12}>
                    <LatestProfit
                        profitData={statsValues.Graphs.ProfitTransition}
                    />
                </Grid>
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                    <TradesByPair pairData={statsValues.Graphs.PairRatio} />
                </Grid>
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                    <LatestCalendar />
                </Grid>
                <Grid item xl={9} lg={8} md={12} sm={12} xs={12}>
                    <LatestOrders items={items} />
                </Grid>
            </Grid>

        </MainLayout>
    );
};

//export default Dashboard;
