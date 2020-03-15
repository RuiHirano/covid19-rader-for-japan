import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, styled } from "@material-ui/core";

import { AccountProfile, AccountDetails, AccountDelete } from "./components";
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

const Account: React.FC = () => {
    const classes = useStyles();

    return (
        <MainLayout title="Account">
            <GridContainer container spacing={4}>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                    <AccountProfile />
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                    <AccountDetails />
                </Grid>

                <Grid item lg={12} md={12} xl={12} xs={12}>
                    <AccountDelete />
                </Grid>
            </GridContainer>

        </MainLayout>
    );
};

export default Account;
