import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { SignInState } from "../../redux/saga/Sign/signSaga";
import { Grid } from "@material-ui/core";

import { Facebook as FacebookIcon, Google as GoogleIcon } from "../../icons";

import ImageField from "./components/ImageField";
import BackButton from "./components/BackButton";
import SignInForm from "./components/SignInForm";

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
    quote: {
        backgroundColor: theme.palette.common.white,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/images/auth.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    quoteInner: {
        textAlign: "center",
        flexBasis: "600px"
    },
    quoteText: {
        color: theme.palette.common.white,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.common.white
    },
    bio: {
        color: theme.palette.common.white
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
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center"
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    socialButtons: {
        marginTop: theme.spacing(3)
    },
    socialIcon: {
        marginRight: theme.spacing(1)
    },
    sugestion: {
        marginTop: theme.spacing(2)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    }
}));

interface Props {
    handleSignIn: (signInState: SignInState) => void;
    handleBack: () => void;
}

const SignIn: React.FC<Props> = props => {
    const { handleBack, handleSignIn } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid className={classes.grid} container>
                <Grid className={classes.quoteContainer} item lg={5}>
                    <ImageField />
                </Grid>
                <Grid className={classes.content} item lg={7} xs={12}>
                    <div className={classes.contentHeader}>
                        <BackButton handleBack={handleBack} />
                    </div>
                    <div className={classes.contentBody}>
                        <SignInForm handleSignUp={handleSignIn} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default SignIn;
