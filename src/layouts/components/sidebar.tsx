import React from "react";
import { Divider, Drawer, colors } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CreateIcon from "@material-ui/icons/Create";
import { withRouter, match } from "react-router";
import * as H from "history";
import { styled } from "@material-ui/core/styles";

import SidebarNav from "./sidebar-nav";
import TitleLogo from "./title-logo";

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
    const mainPages = [
        {
            title: "最新速報",
            href: "/dashboard",
            icon: <DashboardIcon />
        },
        /*{
            title: "Covid19 Map",
            href: "/map",
            icon: <CreateIcon />
        },*/
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
