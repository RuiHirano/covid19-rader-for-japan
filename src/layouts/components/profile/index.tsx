import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";

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

interface Props {}

const Profile: React.FC<Props> = () => {
    const classes = useStyles();

    const user = {
        name: "Shen Zhi",
        avatar: "https://www.fillmurray.com/500/900",
        bio: "Brain Director"
    };

    return (
        <div>
            <Avatar
                alt="Person"
                className={classes.avatar}
                component={RouterLink}
                src={user.avatar}
                to="/settings"
            />
            <Typography className={classes.name} variant="h4">
                {user.name}
            </Typography>
            <Typography variant="body2"> {user.bio} </Typography>
        </div>
    );
};

export default Profile;
