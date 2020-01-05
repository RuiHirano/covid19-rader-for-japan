import React, { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Footer, Sidebar, Header } from "../components";
import theme from "../../styles/theme";

const drawerWidth = 240;

const ContentContainer = styled("div")({
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: drawerWidth + 20,

    [theme.breakpoints.down("sm")]: {
        paddingLeft: 20
    }
});

const HeaderContainer = styled("div")({
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,

    [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 0
    }
});

const SidebarContainer = styled("div")({
    width: drawerWidth,

    [theme.breakpoints.down("sm")]: {
        width: 0
    }
});

interface Props {
    className?: string;
    children?: any;
}

const Main: React.FC<Props> = props => {
    const { children } = props;

    const isDesktop = useMediaQuery(theme.breakpoints.up("md"), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div>
            <HeaderContainer>
                <Header isHome={false} onSidebarOpen={handleSidebarOpen} />
            </HeaderContainer>
            <SidebarContainer>
                <Sidebar
                    isHome={false}
                    onClose={handleSidebarClose}
                    open={shouldOpenSidebar}
                    variant={isDesktop ? "permanent" : "temporary"}
                />
            </SidebarContainer>
            <ContentContainer>{children}</ContentContainer>
        </div>
    );
};

export default Main;
