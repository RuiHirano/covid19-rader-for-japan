import React, { useState, ReactNode } from "react";
import { styled } from "@material-ui/core/styles";
import { Header, Sidebar } from "./components";
import theme from "../styles/theme";
import { useMediaQuery } from "@material-ui/core";

const drawerWidth = 260;
const headerHeight = 36;

const ContentContainer = styled("div")({
    marginTop: headerHeight,
    flexGrow: 1,
    padding: 20,
    marginLeft: drawerWidth,

    [theme.breakpoints.down("md")]: {
        marginTop: 20,
        marginLeft: 0,
        padding: 20,
    }
});

const HeaderContainer = styled("div")({
    width: "100%",
    height: headerHeight,

    [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 0
    }
});

const SidebarContainer = styled("div")({
    width: drawerWidth,
    backgroundColor: "gray",

    [theme.breakpoints.down("md")]: {
        width: 0
    }
});

interface Props {
    className?: string;
    children?: ReactNode;
    title: string
}

const MainLayout: React.FC<Props> = props => {
    const { children, title } = props;


    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div>
            <HeaderContainer>
                <Header title={title} onSidebarOpen={handleSidebarOpen} />
            </HeaderContainer>
            <SidebarContainer>
                <Sidebar
                    onClose={handleSidebarClose}
                    open={shouldOpenSidebar}
                    variant={isDesktop ? "permanent" : "temporary"}
                />
            </SidebarContainer>
            <ContentContainer>{children}</ContentContainer>
        </div>
    );
};

export default MainLayout;
