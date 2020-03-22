import React, { useState, useEffect } from "react";
import { Divider, Drawer, createStyles, Theme } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps, match } from "react-router";
import * as H from "history";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

import SidebarNav from "../sidebar-nav";
import Profile from "../profile";
import { makeStyles } from "@material-ui/core/styles";
import { useSignOut } from "../../../redux/hooks/useAuth";

const drawerWidth = 260;

const DrawerContainer = styled("div")({
    width: 0
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
    const { open, variant, onClose, history, isHome } = props;

    const mainPages = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: <DashboardIcon />
        },
        {
            title: "Create Trade",
            href: "/entry/new",
            icon: <PeopleIcon />
        },
        {
            title: "Calendar",
            href: "/calendar",
            icon: <PeopleIcon />
        },
        {
            title: "Report",
            href: "/report",
            icon: <PeopleIcon />
        },
        {
            title: "History",
            href: "/history",
            icon: <PeopleIcon />
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

    const homePages = [
        {
            title: "Sign In",
            href: "/sign-in",
            icon: <SettingsIcon />
        },
        {
            title: "Sign Up",
            href: "/sign-up",
            icon: <SettingsIcon />
        }
    ];

    const dispatch = useDispatch();
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

    const signout = {
        title: "Sign Out",
        icon: <SettingsIcon />,
        handleSignOut: handleSignOut
    };

    return (
        <Drawer anchor="left" onClose={onClose} open={open} variant={variant}>
            <DrawerContainer>
                <Divider />
                <SidebarNav
                    pages={homePages}
                    isHome={true}
                    signout={signout}
                    onClose={onClose}
                />
            </DrawerContainer>

        </Drawer>
    );
};

export default withRouter(Sidebar);
