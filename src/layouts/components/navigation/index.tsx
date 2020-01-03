import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { styled } from "@material-ui/core/styles";

export const NavContainer = styled("div")({
    width: "100%"
});

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        boxShadow: "none"
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    }
}));

interface NavigationProps {
    isHome: boolean;
    onSidebarOpen?: () => void;
}

const Navigation: React.FC<NavigationProps> = props => {
    const { isHome, onSidebarOpen } = props;
    const classes = useStyles();
    const [notifications] = useState([]);

    return (
        <NavContainer>
            <RouterLink to="/">
                <img
                    alt="Trading Manager"
                    src="./../../../../../public/app_icon.png"
                />
            </RouterLink>
            <div className={classes.flexGrow} />
            <Hidden mdDown>
                <IconButton color="inherit">
                    <Badge
                        badgeContent={notifications.length}
                        color="primary"
                        variant="dot"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton className={classes.signOutButton} color="inherit">
                    <InputIcon />
                </IconButton>
            </Hidden>
            <Hidden lgUp>
                <IconButton color="inherit" onClick={onSidebarOpen}>
                    <MenuIcon />
                </IconButton>
            </Hidden>
        </NavContainer>
    );
};

export default Navigation;
