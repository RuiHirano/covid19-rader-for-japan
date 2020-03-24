import React from "react";
import {
    Badge,
    Toolbar,
    IconButton,
    Typography
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { withRouter, match } from "react-router";
import * as H from "history";
import AlertComponent, { useAlert } from "../../components/alert";
import DialogComponent, { useDialog } from "../../components/dialog";

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

    // alert
    const { openAlert, alertController } = useAlert()
    // dialog
    const { openDialog, dialogController } = useDialog()


    return (
        <div style={{ flexGrow: 1 }}>
            <Toolbar >
                <IconButton
                    onClick={() => onSidebarOpen()}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <Title style={{ color: "black" }}>{title}</Title>

                <IconButton color="inherit">
                    <Badge
                        //badgeContent={notifications.length}
                        color="primary"
                    //variant="dot"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

            </Toolbar>
            <DialogComponent controller={dialogController} />
            <AlertComponent controller={alertController} />
        </div>
    );
};

export default withRouter(MainHeader);
