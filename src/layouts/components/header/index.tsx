import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Badge,
    AppBar,
    Toolbar,
    Hidden,
    IconButton,
    Button,
    createStyles,
    Theme
} from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import InputIcon from "@material-ui/icons/Input";
import { Footer, Sidebar } from "../../components";
import theme from "../../../styles/theme";
import imgPath from "../../../app/assets/app_icon.png";
import { makeStyles } from "@material-ui/styles";

const LogoImage = styled("img")({
    background: theme.palette.primary.main,
    color: "white",
    height: 48
});

const Title = styled(Button)({
    background: theme.palette.primary.main,
    fontSize: 20,
    textAlign: "start",
    color: "white"
});

const Div = styled("div")({
    background: theme.palette.primary.main,
    //flexGrow: 1
    width: 300
});

const SignUpButton = styled(Button)({
    background: theme.palette.primary.main,
    marginLeft: 10,
    marginRight: 10,
    color: "white",
    height: 48
});

const SignInButton = styled(Button)({
    background: theme.palette.primary.main,
    marginLeft: 10,
    marginRight: 10,
    color: "white",
    height: 48
});

interface Props {
    isHome: boolean;
    onSidebarOpen: () => void;
}

const Header: React.FC<Props> = props => {
    const { isHome, onSidebarOpen } = props;

    return (
        <AppBar position="relative">
            <Toolbar>
                {isHome ? (
                    <div>
                        <Hidden smUp>
                            <IconButton
                                onClick={() => onSidebarOpen()}
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
                            <Link to="/">
                                <LogoImage alt="logo" src={imgPath} />
                            </Link>
                            <Title>{"Trading Manager"}</Title>
                            <Div />
                            <Link to="/sign-in">
                                <SignInButton
                                    variant="outlined"
                                    color="inherit"
                                >
                                    コンソールへ移動
                                </SignInButton>
                            </Link>
                            <Link to="/sign-up">
                                <SignUpButton>新規登録</SignUpButton>
                            </Link>
                        </Hidden>
                    </div>
                ) : (
                    <div>
                        <Hidden smUp>
                            <IconButton
                                onClick={() => onSidebarOpen()}
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
                            <Link to="/">
                                <LogoImage alt="logo" src={imgPath} />
                            </Link>
                            <Title>{"Trading Manager"}</Title>

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
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
