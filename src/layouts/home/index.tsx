import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Hidden, IconButton, Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Footer } from "../components";
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

const ContentContainer = styled("div")({
    marginTop: 60
});

interface Props {
    className?: string;
    children?: any;
}

const Home: React.FC<Props> = props => {
    const { children } = props;

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
                        <Link to="/">
                            <LogoImage alt="logo" src={imgPath} />
                        </Link>
                        <Title>{"Trading Manager"}</Title>
                        <Div />
                        <Link to="/sign-in">
                            <SignInButton variant="outlined" color="inherit">
                                コンソールへ移動
                            </SignInButton>
                        </Link>
                        <Link to="/sign-up">
                            <SignUpButton>新規登録</SignUpButton>
                        </Link>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <ContentContainer>{children}</ContentContainer>
            <Footer />
        </div>
    );
};

export default Home;
