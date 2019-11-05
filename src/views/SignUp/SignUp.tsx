import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { SignUpState } from "../../redux/saga/Sign/signSaga";
import ImageField from "./components/ImageField";
import BackButton from "./components/BackButton";
import SignUpForm from "./components/SignUpForm";

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

interface Props {
    handleSignUp: (signUpState: SignUpState) => void;
    handleBack: () => void;
}

const SignUp: React.FC<Props> = props => {
    const { handleBack, handleSignUp } = props;

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
                        <SignUpForm handleSignUp={handleSignUp} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default SignUp;
