import React, { useEffect, useRef } from "react";
import { withRouter, match } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { SignInState, signActions } from "../../redux/saga/Sign/signSaga";
import { Grid } from "@material-ui/core";
import ImageField from "./components/ImageField/ImageField";
import BackButton from "./components/BackButton/BackButton";
import SignInForm from "./components/SignInForm/SignInForm";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/configureStore";
import { Loading, LoadingState } from "../../types";
import * as H from "history";
import { useLoading } from "../../common/hooks/useLoading";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}

const SignInContainer: React.FC<ContainerProps> = props => {
    const { history } = props;

    const { isLoading, isFinishLoading } = useLoading(LoadingState.SIGN_IN);

    useEffect(() => {
        if (isFinishLoading) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    return <SignIn />;
};

export default withRouter(SignInContainer);

// Presentational
interface Props {}

const SignIn: React.FC<Props> = props => {
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
                        <SignInForm />
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

//export default SignIn;
