import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import validate from "validate.js";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import {
    Facebook as FacebookIcon,
    Google as GoogleIcon
} from "../../../../icons";

const useStyles = makeStyles((theme: Theme) => ({
    socialButtons: {
        marginTop: theme.spacing(3)
    },
    socialIcon: {
        marginRight: theme.spacing(1)
    },
    sugestion: {
        marginTop: theme.spacing(2)
    }
}));

interface Props {}

const SocialIcon: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <div>
            <Grid className={classes.socialButtons} container spacing={2}>
                <Grid item>
                    <Button
                        color="primary"
                        onClick={() => console.log("Facebook")}
                        size="large"
                        variant="contained"
                    >
                        <FacebookIcon className={classes.socialIcon} />
                        Login with Facebook
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => console.log("Google")}
                        size="large"
                        variant="contained"
                    >
                        <GoogleIcon className={classes.socialIcon} />
                        Login with Google
                    </Button>
                </Grid>
            </Grid>
            <Typography
                align="center"
                className={classes.sugestion}
                color="textSecondary"
                variant="body1"
            >
                or login with email address
            </Typography>
        </div>
    );
};

export default SocialIcon;
