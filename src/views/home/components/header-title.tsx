import * as React from "react";
import { Button, Divider, Typography, CardMedia, colors, Paper } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import imgPath from "../../../app/assets/office.jpg"

const Title = styled(Typography)({
    fontSize: 100,
    display: "block",
    textAlign: "center",
    color: "white",

    [theme.breakpoints.down("sm")]: {
        fontSize: 30,
        paddingTop: 100
    }
});

const Description = styled(Typography)({
    fontSize: 20,
    paddingTop: 30,
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: "center",
    color: theme.palette.background.default,

    [theme.breakpoints.down("sm")]: {
        fontSize: 15,
        paddingTop: 20,
        paddingLeft: 50,
        paddingRight: 50
    }
});

const HeaderTitleContainer = styled("div")({
    backgroundColor: theme.palette.primary.dark,
    height: window.innerHeight,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        height: 300
    }
});
console.log("screenheight: ", window.innerHeight)

const HeaderTitle: React.FC = () => {
    return (
        <HeaderTitleContainer>
            <CardMedia image={imgPath} style={{ height: "100%" }}>
                <Title >Trading Manager</Title>
                <Description style={{ fontSize: 50 }}>
                    上達したいあなたへ最大限のサポート
            </Description>
                <div style={{ display: "flex", }}>
                    <Paper style={{ width: 300, height: 300, margin: 50 }}>{"TradingManagerにアクセス"}</Paper>
                    <Paper style={{ width: 300, height: 300, margin: 50 }}>{"初めて使用する"}</Paper>
                </div>
            </CardMedia>
        </HeaderTitleContainer>
    );
};

export default HeaderTitle;
