import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import iconImg from "../../assets/icon/app_icon.png";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "fit-content"
    },
    avatar: {
        width: 50,
        height: 50
    },
    name: {
        marginTop: theme.spacing(1),
        color: theme.palette.background.default,
        width: "100%",
        fontSize: 18,
        textAlign: "center"
    }
}));

const TitleLogoContainer = styled("div")({
    padding: 20,
    display: "flex",
});

interface Props { }

const TitleLogo: React.FC<Props> = () => {
    const classes = useStyles();

    return (
        <TitleLogoContainer>
            <Avatar
                alt="Logo"
                className={classes.avatar}
                component={RouterLink}
                src={iconImg}
                to="/dashboard"
            />
            <Typography className={classes.name}>
                {"Covid19 Rader for Japan"}
            </Typography>
        </TitleLogoContainer>
    );
};

export default TitleLogo;
