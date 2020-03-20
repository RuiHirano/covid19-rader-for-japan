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
    Theme,
    colors
} from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import theme from "../../../styles/theme";

const LogoImage = styled("img")({
    background: theme.palette.primary.main,
    color: "white",
    height: 40,
    verticalAlign: "middle"
});

const Title = styled(Button)({
    backgroundColor: colors.grey[100],
    fontSize: 20,
    textAlign: "start",
    color: "black",
    flexGrow: 1,
    display: 'block',
});

const SignUpButton = styled(Button)({
    background: theme.palette.primary.main,
    marginLeft: 10,
    marginRight: 10,
    color: "white",
    height: 48,
    width: 120
    //position: "relative"
});

const SignInButton = styled(Button)({
    marginLeft: 10,
    marginRight: 10,
    color: "black",
    borderWidth: 1,
    height: 48
});

interface Props {
    isHome: boolean;
    onSidebarOpen: () => void;
}

const HomeHeader: React.FC<Props> = props => {
    const { isHome, onSidebarOpen } = props;

    return (
        <div style={{ flexGrow: 1 }}>
            <AppBar position="relative" style={{ backgroundColor: colors.grey[100] }}>
                <Toolbar >
                    <Hidden smUp>
                        <IconButton
                            onClick={() => onSidebarOpen()}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Title>{"Trading Manager"}</Title>

                    <Hidden smDown>
                        <div >
                            <Link to="/sign-in">
                                <SignInButton
                                    variant="outlined"
                                //color="inherit"
                                >
                                    コンソールへ移動
                                </SignInButton>
                            </Link>
                            <Link to="/sign-up">
                                <SignUpButton>新規登録</SignUpButton>
                            </Link>
                        </div>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default HomeHeader;
