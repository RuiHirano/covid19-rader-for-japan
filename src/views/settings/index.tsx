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

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Settings: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item md={7} xs={12}>
                    <Notifications />
                </Grid>
                <Grid item md={5} xs={12}>
                    <Password />
                </Grid>
                {/*<Grid item md={7} xs={12}>
                    <BankAccount />
	</Grid>*/}
                <Grid item md={5} xs={12}>
                    <Content />
                </Grid>
                <Grid item md={7} xs={12}>
                    <Language />
                </Grid>
                <Grid item md={5} xs={12}>
                    <Email />
                </Grid>
                <Grid item md={5} xs={12}>
                    <Plan />
                </Grid>
            </Grid>
        </div>
    );
};

export default Settings;
