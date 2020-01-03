import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Badge,
    AppBar,
    Toolbar,
    Hidden,
    IconButton,
    Button
} from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import InputIcon from "@material-ui/icons/Input";
import { Footer, Sidebar } from "../components";
import theme from "../../styles/theme";
import imgPath from "../../app/assets/app_icon.png";

const LogoImage = styled("img")({
    background: theme.palette.primary.main,
    color: "white",
    height: 48
});

const Title = styled(Button)({
    background: theme.palette.primary.main,
    fontSize: 20,
    textAlign: "start",
    color: "white",
    height: 48
});

const Div = styled("div")({
    background: theme.palette.primary.main,
    flexGrow: 1
});

const ContentContainer = styled("div")({
    marginTop: 60,
    paddingLeft: 240
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
            <AppBar>
                <Toolbar>
                    <Hidden smUp>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/">
                            <LogoImage alt="logo" src={imgPath} />
                        </Link>
                        <Title>{"Trading Manager"}</Title>
                    </Hidden>
                    <Hidden smDown>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/">
                            <LogoImage alt="logo" src={imgPath} />
                        </Link>
                        <Title>{"Trading Manager"}</Title>
                        <Div />
                        <IconButton color="inherit">
                            <Badge
                                //badgeContent={notifications.length}
                                color="primary"
                                variant="dot"
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <InputIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Sidebar
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? "persistent" : "temporary"}
            />
            <ContentContainer>{children}</ContentContainer>
        </div>
    );
};

export default Main;
