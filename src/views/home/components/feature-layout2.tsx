import * as React from "react";
import { Typography, Grid, useMediaQuery, colors, Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

interface Props {
    title: string;
    text: string;
    imgPath: string;
}

const FeatureGrid = styled(Grid)({
    height: 400
});

const DescriptionGrid = styled(Grid)({
    textAlign: "left",

    [theme.breakpoints.down("sm")]: {
        textAlign: "center"
    }
});

const Image = styled("img")({
    padding: 60,
    height: "90%",
    width: "90%",

    [theme.breakpoints.down("md")]: {
        padding: 30
    },

    [theme.breakpoints.down("sm")]: {
        padding: 15
    }
});

const Title = styled(Typography)({
    fontSize: 50,
    margin: 30,
    color: colors.grey[800],
    textAlign: "center",
    width: "100%",
    paddng: 300,

    [theme.breakpoints.down("sm")]: {
        fontSize: 17,
        margin: 15
    }
});

const Description = styled(Typography)({
    fontSize: 25,
    margin: 30,
    color: colors.grey[800],
    textAlign: "center",
    width: "100%",
    paddng: 300,

    [theme.breakpoints.down("sm")]: {
        fontSize: 13,
        margin: 15
    }
});

const ImageGrid = styled(Grid)({
    textAlign: "center",
    alignSelf: "center",

    [theme.breakpoints.down("sm")]: {}
});

const FeatureLayout: React.FC<Props> = props => {
    const { title, text, imgPath } = props;

    return (
        <FeatureGrid container>
            <DescriptionGrid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Title >{title}</Title>
                <Description variant="subtitle1">{text}</Description>
                <Button style={{ height: 50 }} variant={"contained"}>Trading Managerへアクセス</Button>
            </DescriptionGrid>
        </FeatureGrid>
    );
};

export default FeatureLayout;
