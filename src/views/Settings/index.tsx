import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

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
import theme from "../../styles/theme";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const GridContainer = styled(Grid)({
    [theme.breakpoints.down("xl")]: {
        paddingRight: 350,
        paddingLeft: 350
    },
    [theme.breakpoints.down("lg")]: {
        paddingRight: 250,
        paddingLeft: 250
    },
    [theme.breakpoints.down("md")]: {
        paddingRight: 100,
        paddingLeft: 100
    },
    [theme.breakpoints.down("sm")]: {
        paddingRight: 0,
        paddingLeft: 0
    },
    [theme.breakpoints.down("xs")]: {
        paddingRight: 0,
        paddingLeft: 0
    },
});

const Settings: React.FC = () => {
    const classes = useStyles();

    return (
        <MainLayout title="Settings">
            <GridContainer container spacing={4}>
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
            </GridContainer>
        </MainLayout>
    );
};

export default Settings;
