import React from "react";
import { Divider, Drawer, colors, useMediaQuery } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MapIcon from "@material-ui/icons/Map";
import { withRouter, match } from "react-router";
import * as H from "history";
import { styled } from "@material-ui/core/styles";

import SidebarNav from "./sidebar-nav";
import TitleLogo from "./title-logo";
import theme from "../../styles/theme";

const drawerWidth = 260;
const headerHeight = 56;

const DrawerContainer = styled("div")({
    paddingTop: headerHeight,
    width: drawerWidth,
    height: "100%",
    backgroundColor: colors.grey[900],
});

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
    onClose: () => void;
    open: boolean;
    variant: "permanent" | "persistent" | "temporary" | undefined;
}

const Sidebar: React.FC<Props> = props => {
    const { variant, onClose, history } = props;
    const drawerOpen = props.open
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });
    const mainPages = isDesktop ? [
        {
            title: "最新速報",
            text: "更新中",
            href: "/dashboard",
            icon: <DashboardIcon />
        },
        {
            title: "感染状況マップ",
            text: "実装中",
            href: "/map",
            icon: <MapIcon />
        },
    ] : [
            {
                title: "最新速報",
                text: "更新中",
                href: "/dashboard",
                icon: <DashboardIcon />
            },
        ];



    return (
        <div>
            <Drawer anchor="left" onClose={onClose} open={drawerOpen} variant={variant}>
                <DrawerContainer>
                    <TitleLogo />
                    <Divider style={{ backgroundColor: "white" }} />
                    <SidebarNav
                        pages={mainPages}
                        onClose={onClose}
                    />
                </DrawerContainer>
            </Drawer>
        </div>
    );
};

export default withRouter(Sidebar);
