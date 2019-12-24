import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ImageField from "./components/ImageField/ImageField";
import BackButton from "./components/BackButton/BackButton";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import { AppState, ActionTypes } from "../../redux/configureStore";
import { withRouter, RouteComponentProps, match } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Loading, LoadingState } from "../../types";
import * as H from "history";
import { useLoading } from "../../common/hooks/useLoading";

interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}

const SignUpContainer: React.FC<ContainerProps> = props => {
    const { history } = props;

    const { isLoading, isFinishLoading } = useLoading(LoadingState.SIGN_UP);

    useEffect(() => {
        if (isFinishLoading) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    return <SignUp />;
};

export default withRouter(SignUpContainer);

interface Props {}

const SignUp: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid className={classes.grid} container>
                <Grid className={classes.quoteContainer} item lg={5}>
                    <ImageField />
                </Grid>
                <Grid className={classes.content} item lg={7} xs={12}>
                    <div className={classes.contentHeader}>
                        <BackButton />
                    </div>
                    <div className={classes.contentBody}>
                        <SignUpForm />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: "100%"
    },
    grid: {
        height: "100%"
    },
    quoteContainer: {
        [theme.breakpoints.down("md")]: {
            display: "none"
        }
    },

    contentContainer: {},
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    contentHeader: {
        display: "flex",
        alignItems: "center",
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    contentBody: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center"
        }
    }
}));

//export default SignUp;
