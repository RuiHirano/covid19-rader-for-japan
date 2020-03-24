import React from "react";
import { Grid } from "@material-ui/core";

import {
    PatientsTransition
} from "./components";
import MainLayout from "../../layouts";
import TotalPatientsTransition from "./components/total-patients-transition";
import PercentPatientsTransition from "./components/percent-patients-transition copy";
import PatientsBarTransition from "./components/patient-bar-transition";


interface Props {
}

const DashboardView: React.FC<Props> = props => {

    return (
        <MainLayout title="Dashboard">
            <Grid container spacing={2}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PatientsTransition />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <TotalPatientsTransition />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PercentPatientsTransition />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PatientsBarTransition />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PatientsTransition />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PatientsTransition />
                </Grid>
            </Grid>

        </MainLayout>
    );
};

export default DashboardView;
