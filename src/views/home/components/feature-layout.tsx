import * as React from "react";
import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

interface Props {
    isRight: boolean;
    title: string;
    text: string;
    imgPath: string;
}

const FeatureGrid = styled(Grid)({});

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
    fontSize: 30,
    margin: 30,
    color: theme.palette.text.primary,
    height: 30,

    [theme.breakpoints.down("sm")]: {
        fontSize: 17,
        margin: 15
    }
});

const Description = styled(Typography)({
    fontSize: 25,
    margin: 30,
    color: theme.palette.text.primary,
    height: 30,

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
    const { isRight, title, text, imgPath } = props;

    const isXS = useMediaQuery(theme.breakpoints.down("xs"), {
        defaultMatches: true
    });
    if (isRight || isXS) {
        return (
            <FeatureGrid container>
                <DescriptionGrid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Title variant="h5">{title}</Title>
                    <Description variant="subtitle1">{text}</Description>
                </DescriptionGrid>
                <ImageGrid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Image alt="image" src={imgPath} />
                </ImageGrid>
            </FeatureGrid>
        );
    } else {
        return (
            <FeatureGrid container>
                <ImageGrid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Image alt="image" src={imgPath} />
                </ImageGrid>
                <DescriptionGrid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Title variant="h5">{title}</Title>
                    <Description variant="subtitle1">{text}</Description>
                </DescriptionGrid>
            </FeatureGrid>
        );
    }
};

export default FeatureLayout;
