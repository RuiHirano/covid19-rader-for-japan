import React, { useState, ReactNode } from "react";
import { styled } from "@material-ui/core/styles";
import { Header, Sidebar } from "./components";
import theme from "../styles/theme";

const drawerWidth = 260;
const headerHeight = 36;

const ContentContainer = styled("div")({
    marginTop: headerHeight,
    padding: 20,

    [theme.breakpoints.down("sm")]: {
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

    [theme.breakpoints.down("sm")]: {
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

    const shouldOpenSidebar = openSidebar;

    return (
        <div>
            <HeaderContainer>
                <Header title={title} onSidebarOpen={handleSidebarOpen} />
            </HeaderContainer>
            <SidebarContainer>
                <Sidebar
                    onClose={handleSidebarClose}
                    open={shouldOpenSidebar}
                    variant={"temporary"}
                />
            </SidebarContainer>
            <ContentContainer>{children}</ContentContainer>
        </div>
    );
};

export default MainLayout;
