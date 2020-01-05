import * as React from "react";
import { Button, Divider, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

const Title = styled(Typography)({
    fontSize: 50,
    paddingTop: 250,
    textAlign: "center",
    color: theme.palette.background.default,

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
    height: 500,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        height: 300
    }
});

const HeaderTitle: React.FC = () => {
    return (
        <HeaderTitleContainer>
            <Title variant="h2">Trading Manager</Title>
            <Description variant="h6">
                あなたの日々のFXや株、仮想通貨取引を記録し、自動的に分析をします。
                過去の取引を振り返ることで、効率よくトレードの質をあげることができます。
            </Description>
            <Divider />
        </HeaderTitleContainer>
    );
};

export default HeaderTitle;
