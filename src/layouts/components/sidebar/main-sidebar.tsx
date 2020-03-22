import React, { useState, useEffect } from "react";
import { Divider, Drawer, createStyles, Theme, colors } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import CalendarIcon from "@material-ui/icons/Today";
import ReportIcon from "@material-ui/icons/Timeline";
import HistoryIcon from "@material-ui/icons/History";
import SignoutIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps, match } from "react-router";
import * as H from "history";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

import SidebarNav from "../sidebar-nav";
import Profile from "../profile";
import { makeStyles } from "@material-ui/styles";
import { useSignOut } from "../../../redux/hooks/useAuth";
import TitleLogo from "../title-logo";
import AlertComponent, { AlertType, useAlert } from "../../../components/alert";
import DialogComponent, { useDialog } from "../../../components/dialog";

const drawerWidth = 260;

const DrawerContainer = styled("div")({
    width: drawerWidth,
    height: "100%",
    backgroundColor: colors.grey[900]
});

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
    isHome: boolean;
    onClose: () => void;
    open: boolean;
    variant: "permanent" | "persistent" | "temporary" | undefined;
}

const Sidebar: React.FC<Props> = props => {
    const { variant, onClose, history, isHome } = props;
    const drawerOpen = props.open
    const mainPages = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: <DashboardIcon />
        },
        {
            title: "Create",
            href: "/entry/new",
            icon: <CreateIcon />
        },
        {
            title: "Calendar",
            href: "/calendar",
            icon: <CalendarIcon />
        },
        {
            title: "Report",
            href: "/report",
            icon: <ReportIcon />
        },
        {
            title: "History",
            href: "/history",
            icon: <HistoryIcon />
        },
        {
            title: "Account",
            href: "/account",
            icon: <AccountBoxIcon />
        },
        {
            title: "Settings",
            href: "/settings",
            icon: <SettingsIcon />
        }
    ];

    const { signOut, status } = useSignOut()

    const signout = {
        title: "Signout",
        icon: <SignoutIcon />,
    };

    return (
        <div>
            <Drawer anchor="left" onClose={onClose} open={drawerOpen} variant={variant}>
                <DrawerContainer>
                    <TitleLogo />
                    <Divider style={{ backgroundColor: "white" }} />
                    <SidebarNav
                        isHome={false}
                        pages={mainPages}
                        signout={signout}
                        onClose={onClose}
                    />
                </DrawerContainer>
            </Drawer>
        </div>
    );
};

export default withRouter(Sidebar);
