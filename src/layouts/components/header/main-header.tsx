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
import AlertComponent, { useAlert, AlertType } from "../../../components/alert";
import DialogComponent, { useDialog } from "../../../components/dialog";

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
    // alert
    const { openAlert, closeAlert, alertStatus } = useAlert()
    // dialog
    const { open, openDialog, closeDialog } = useDialog()

    const handleSignOut = () => {
        signOut();
    };

    useEffect(() => {
        console.log("signIn status change", status.Progress)
        if (status.Progress === 100) {
            openAlert(AlertType.SUCCESS, "finish run command")
            history.push("/")
        }
        if (status.Error !== "") {
            console.log("error occer: ", status.Error)
            openAlert(AlertType.ERROR, "error occur while running command")
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
                    <IconButton color="inherit" onClick={() => openDialog()}>
                        <InputIcon />
                    </IconButton>
                </Hidden>

            </Toolbar>
            <DialogComponent open={open} closeDialog={closeDialog} runFunc={handleSignOut} />
            <AlertComponent closeAlert={closeAlert} alertStatus={alertStatus} />
        </div>
    );
};

export default withRouter(MainHeader);
