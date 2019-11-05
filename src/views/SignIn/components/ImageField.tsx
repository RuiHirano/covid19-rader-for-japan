import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import validate from "validate.js";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
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
    }
}));

interface Props {}

const ImageField: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <div className={classes.quote}>
            <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                    Hella narwhal Cosby sweater McSweeney's, salvia kitsch
                    before they sold out High Life.
                </Typography>
                <div
                //className={classes.person}
                >
                    <Typography className={classes.name} variant="body1">
                        Takamaru Ayako
                    </Typography>
                    <Typography className={classes.bio} variant="body2">
                        Manager at inVision
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default ImageField;
