import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import {
    Notifications,
    Password,
    Content,
    BankAccount,
    Language,
    Email,
    Plan
} from "./components";
import { Main as MainLayout } from "../../layouts";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Settings: React.FC = () => {
    const classes = useStyles();

    return (
        <MainLayout title="Settings">
            <Grid container spacing={4}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Notifications />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Password />
                </Grid>
                {/*<Grid item md={7} xs={12}>
                    <BankAccount />
	</Grid>*/}
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Content />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Language />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Email />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Plan />
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default Settings;
