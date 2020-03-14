import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Badge,
    AppBar,
    Toolbar,
    Hidden,
    IconButton,
    Button,
    createStyles,
    Theme,
    Typography
} from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import InputIcon from "@material-ui/icons/Input";
import theme from "../../../styles/theme";
import { useSignOut } from "../../../redux/hooks/useAuth";
import { withRouter, RouteComponentProps, match } from "react-router";
import * as H from "history";

const Title = styled(Typography)({
    fontSize: 20,
    textAlign: "start",
    color: "black",
    flexGrow: 1,
    display: 'block',
});


interface Props {
    history: H.History;
    location: H.Location;
    match: match;
    title: string
    onSidebarOpen: () => void;
}


const MainHeader: React.FC<Props> = props => {
    const { title, onSidebarOpen, history } = props;

    const { signOut, status } = useSignOut()

    const handleSignOut = () => {
        signOut();
    };

    useEffect(() => {
        console.log("signIn status change", status.Progress)
        if (status.Progress === 100) {
            history.push("/")
        }
        if (status.Error !== "") {
            console.log("error occer: ", status.Error)
        }

    }, [status])

    return (
        <div style={{ flexGrow: 1 }}>
            <Toolbar >
                <Hidden smUp>
                    <IconButton
                        onClick={() => onSidebarOpen()}
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Title style={{ color: "black" }}>{title}</Title>

                <Hidden smDown>
                    <IconButton color="inherit">
                        <Badge
                            //badgeContent={notifications.length}
                            color="primary"
                        //variant="dot"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" onClick={() => handleSignOut()}>
                        <InputIcon />
                    </IconButton>
                </Hidden>

            </Toolbar>
        </div>
    );
};

export default withRouter(MainHeader);
