import React, { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Footer, HomeHeader, HomeSidebar } from "../components";
import theme from "../../styles/theme";
import imgPath from "../../app/assets/app_icon.png";

const ContentContainer = styled("div")({});

interface Props {
    className?: string;
    children?: any;
}

const Home: React.FC<Props> = props => {
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
            <HomeHeader isHome={true} onSidebarOpen={handleSidebarOpen} />
            <HomeSidebar
                isHome={true}
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? "persistent" : "temporary"}
            />
            <ContentContainer>{children}</ContentContainer>
            {/*<Footer />*/}
        </div>
    );
};

export default Home;
