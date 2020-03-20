import * as React from "react";
import { Button, Divider, Typography, CardMedia, colors, Paper } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import imgPath from "../../../app/assets/office.jpg"
import HeaderPaper from "./header-paper";

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
            <CardMedia image={imgPath} style={{ height: "100%", }}>
                <div style={{ paddingTop: 200 }}>
                    <Title >Trading Manager</Title>
                    <Description style={{ fontSize: 50, marginBottom: 30 }}>
                        上達したいあなたへ最大限のサポート
                    </Description>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <HeaderPaper title={"ログインする"} description={"あらゆるデバイスで取引を一括管理、統計分析、可視化、振り返りができます。"} buttonText={"TradingManagerへアクセス"} />
                        <HeaderPaper title={"まずは使ってみる"} description={"取引管理、統計分析、可視化などあらゆる機能を無料で体験できます。"} buttonText={"新規登録"} />
                    </div>
                </div>
            </CardMedia>
        </HeaderTitleContainer>
    );
};

export default HeaderTitle;
