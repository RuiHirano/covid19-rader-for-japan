import React from "react";
import { Grid, colors } from "@material-ui/core";
import StatsPaper from "./stats-paper";
import Warning from "./warning";
import { StatData } from "../../../types";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/module";


interface Props {
}

const createData = (statsData: StatData[]) => {
    let totalPatients = 0
    let totalHospitals = 0
    let totalDischarges = 0
    let totalDeaths = 0
    let datePatients = 0
    let dateHospitals = 0
    let dateDischarges = 0
    let dateDeaths = 0
    if (statsData.length > 0) {
        const lastDate = statsData[statsData.length - 1].Date
        console.log("statData: ", statsData)
        statsData.forEach((stat) => {
            if (stat.Date === lastDate) {
                totalPatients += stat.TotalCases
                totalHospitals += stat.TotalHospitals
                totalDischarges += stat.TotalDischarges
                totalDeaths += stat.TotalDeaths
                datePatients += stat.Cases
                if (stat.Hospitals !== undefined) {
                    dateHospitals += stat.Hospitals
                }
                if (stat.Discharges !== undefined) {
                    dateDischarges += stat.Discharges
                }
                dateDeaths += stat.Deaths
            }
        })
    }
    return { "patients": [totalPatients, datePatients], "hospitals": [totalHospitals, dateHospitals], "discharges": [totalDischarges, dateDischarges], "deaths": [totalDeaths, dateDeaths] }
}

const StatsBoard: React.FC<Props> = props => {
    const statsData = useSelector((state: ReduxState) => state.Data.StatsData)
    const { patients, hospitals, discharges, deaths } = createData(statsData)

    return (
        <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Warning />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <StatsPaper title={"罹患者数"} totalValue={patients[0]} dateValue={patients[1]} color={colors.yellow[900]} />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <StatsPaper title={"入院者数"} totalValue={hospitals[0]} dateValue={hospitals[1]} color={colors.green[800]} />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <StatsPaper title={"退院者数"} totalValue={discharges[0]} dateValue={discharges[1]} color={colors.blue[800]} />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <StatsPaper title={"死亡者数"} totalValue={deaths[0]} dateValue={deaths[1]} color={colors.deepOrange[800]} />
            </Grid>
        </Grid>

    );
};

export default StatsBoard;
