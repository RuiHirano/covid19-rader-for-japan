import React from "react";
import {
    Badge,
    Toolbar,
    IconButton,
    Typography,
    AppBar,
    colors,
    Hidden
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { withRouter, match } from "react-router";
import * as H from "history";
import AlertComponent, { useAlert } from "../../components/alert";
import DialogComponent, { useDialog } from "../../components/dialog";
import theme from "../../styles/theme";

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

    return (
        <div style={{ flexGrow: 1 }}>
            <AppBar style={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: colors.blue[700] }}>
                <Toolbar >
                    <Hidden lgUp>
                        <IconButton
                            onClick={() => onSidebarOpen()}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Title style={{ color: "white" }}>{title}</Title>

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(MainHeader);
