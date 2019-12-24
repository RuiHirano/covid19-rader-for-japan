import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/Image";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useLoading } from "../../../../common/hooks/useLoading";
import { LoadingState } from "../../../../types";
import { useDispatch } from "react-redux";
import { signActions } from "../../../../redux/saga/Sign/signSaga";
import { withRouter, RouteComponentProps, match } from "react-router";
import * as H from "history";

import { Profile, SidebarNav, UpgradePlan } from "./components";

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up("lg")]: {
            marginTop: 64,
            height: "calc(100% - 64px)"
        }
    },
    root: {
        backgroundColor: theme.palette.common.white,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    nav: {
        marginBottom: theme.spacing(2)
    }
}));

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
    className?: string;
    onClose: () => void;
    open: boolean;
    variant: "permanent" | "persistent" | "temporary" | undefined;
}

const Sidebar: React.FC<Props> = props => {
    const { open, variant, onClose, className, history } = props;

    const classes = useStyles();

    const pages = [
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

    const dispatch = useDispatch();

    const { isLoading, isFinishLoading } = useLoading(LoadingState.SIGN_OUT);

    useEffect(() => {
        if (isFinishLoading) {
            history.push("/");
        }
    }, [isLoading]);

    const handleSignOut = () => {
        dispatch(signActions.signOutAction());
    };

    const signout = {
        title: "Sign Out",
        icon: <SettingsIcon />,
        handleSignOut: handleSignOut
    };

    return (
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div className={clsx(classes.root, className)}>
                <Profile />
                <Divider className={classes.divider} />
                <SidebarNav
                    className={classes.nav}
                    pages={pages}
                    signout={signout}
                />
            </div>
        </Drawer>
    );
};

export default withRouter(Sidebar);
