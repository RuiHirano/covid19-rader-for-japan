import React from "react";
import { Grid } from "@material-ui/core";

import {
    PatientsTransition
} from "./components";
import MainLayout from "../../layouts";


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
                    <PatientsTransition />
                </Grid>
                <Grid item xl={9} lg={8} md={12} sm={12} xs={12}>
                    <PatientsTransition />
                </Grid>
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                    <PatientsTransition />
                </Grid>
                <Grid item xl={9} lg={8} md={12} sm={12} xs={12}>
                    <PatientsTransition />
                </Grid>
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                    <PatientsTransition />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <PatientsTransition />
                </Grid>
            </Grid>

        </MainLayout>
    );
};

export default DashboardView;
