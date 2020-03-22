import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import {
    TotalAssets,
    ProfitRatio,
    WinRate,
    TotalProfit,
    LatestProfit,
    TradesByPair,
    LatestOrders,
    LatestCalendar,
    LatestAssets,
    TradesByClass
} from "./components";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../redux/module";
import { Item } from "../../types";
import moment, { Moment } from "moment";
import { Main as MainLayout } from "../../layouts";
import { PeriodType, useStatistics } from "../../redux/hooks/useStatistics";


interface Props {
}

const DashboardView: React.FC<Props> = props => {

    const items: Item[] = useSelector((state: ReduxState) => state.Items);

    const [date, setDate] = useState<Moment>(moment());
    const [periodType, setPriodType] = useState<PeriodType>(PeriodType.MONTH);
    const { calcStats, status, statsResult } = useStatistics()
    useEffect(() => {
        calcStats(date, periodType)
    }, [date])

    return (
        <MainLayout title="Dashboard">
            <Grid container spacing={2}>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                    <TotalAssets
                        totalAssets={statsResult.Statistics.TotalAssets}
                    />
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                    <ProfitRatio
                        profitRatio={statsResult.Statistics.ProfitRatio}
                    />
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                    <WinRate winRate={statsResult.Statistics.WinRate} />
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                    <TotalProfit
                        totalProfit={statsResult.Statistics.TotalProfit}
                    />
                </Grid>
                <Grid item xl={9} lg={8} md={12} sm={12} xs={12}>
                    <LatestProfit
                        profitData={statsResult.Graphs.ProfitTransition}
                    />
                </Grid>
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                    <TradesByClass pairData={statsResult.Graphs.PairRatio} />
                </Grid>
                <Grid item xl={9} lg={8} md={12} sm={12} xs={12}>
                    <LatestAssets
                        profitData={statsResult.Graphs.ProfitTransition}
                    />
                </Grid>
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                    <TradesByPair pairData={statsResult.Graphs.PairRatio} />
                </Grid>


                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <LatestOrders items={items} />
                </Grid>
            </Grid>

        </MainLayout>
    );
};

export default DashboardView;
