import React from "react";
import { Grid } from "@material-ui/core";
import MainLayout from "../../layouts";
import PatientsByPrefView from "./components/patient-by-pref";
import PatientsByDateView from "./components/patient-by-date";
import PatientsMap from "./components/patient-map";


interface Props {
}

const DashboardView: React.FC<Props> = props => {

    return (
        <MainLayout title="Dashboard">
            <Grid container spacing={2}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PatientsByDateView />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PatientsByPrefView />
                </Grid>
                {/*<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PatientsMap />
    </Grid>*/}
                {/*<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <TotalPatientsTransition />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PatientsBarTransition />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <PatientsTransition />
                </Grid>*/}
            </Grid>

        </MainLayout>
    );
};

export default DashboardView;
