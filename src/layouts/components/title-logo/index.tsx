import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { User } from "../../../types";
import { useSelector } from "react-redux";
import imgPath from "../../../app/assets/app_icon.png";
import { ReduxState } from "../../../redux/module";

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

    const user: User = useSelector((state: ReduxState) => state.User);

    /*const user = {
        name: "Shen Zhi",
        avatar: "https://www.fillmurray.com/500/900",
        bio: "Brain Director"
    };*/

    return (
        <TitleLogoContainer>
            <Avatar
                alt="Person"
                className={classes.avatar}
                component={RouterLink}
                src={imgPath}
                to="/account"
            />
            <Typography className={classes.name}>
                {"Trading Manager"}
            </Typography>
        </TitleLogoContainer>
    );
};

export default TitleLogo;
