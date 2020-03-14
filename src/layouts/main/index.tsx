import React, { useState, ReactNode } from "react";
import { useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Footer, MainSidebar, MainHeader } from "../components";
import Header2 from "../components/header/main-header"
import theme from "../../styles/theme";

const drawerWidth = 260;
const headerHeight = 36;

const ContentContainer = styled("div")({
    marginTop: headerHeight,
    marginLeft: drawerWidth,
    padding: 20,

    [theme.breakpoints.down("sm")]: {
        marginTop: 20,
        marginLeft: 0,
        padding: 20,
    }
});

const HeaderContainer = styled("div")({
    width: `calc(100% - ${drawerWidth}px)`,
    height: headerHeight,
    marginLeft: drawerWidth,

    [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 0
    }
});

const SidebarContainer = styled("div")({
    width: drawerWidth,
    backgroundColor: "gray",

    [theme.breakpoints.down("sm")]: {
        width: 0
    }
});

interface Props {
    className?: string;
    children?: ReactNode;
    title: string
}

const Main: React.FC<Props> = props => {
    const { children, title } = props;

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
                <MainHeader title={title} onSidebarOpen={handleSidebarOpen} />
            </HeaderContainer>
            <SidebarContainer>
                <MainSidebar
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
