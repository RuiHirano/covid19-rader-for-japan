import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import { User } from "../../../types";
import { AppState } from "../../../redux/module";
import { useSelector } from "react-redux";
import myAvatar from "../../../app/assets/app_icon.png";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "fit-content"
    },
    avatar: {
        width: 60,
        height: 60
    },
    name: {
        marginTop: theme.spacing(1)
    }
}));

const ProfileContainer = styled("div")({
    padding: 20
});

interface Props {}

const Profile: React.FC<Props> = () => {
    const classes = useStyles();

    const user: User = useSelector((state: AppState) => state.User);

    /*const user = {
        name: "Shen Zhi",
        avatar: "https://www.fillmurray.com/500/900",
        bio: "Brain Director"
    };*/

    return (
        <ProfileContainer>
            <Avatar
                alt="Person"
                className={classes.avatar}
                component={RouterLink}
                src={
                    user.Profile.Thumbnail.url === ""
                        ? myAvatar
                        : user.Profile.Thumbnail.url
                }
                to="/account"
            />
            <Typography className={classes.name} variant="h4">
                {user.Profile.Name}
            </Typography>
            <Typography variant="body2"> {user.Setting.Email} </Typography>
        </ProfileContainer>
    );
};

export default Profile;
