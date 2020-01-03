import * as React from "react";
import {Divider, Typography} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
interface Props {
    title: string;
    free: string;
    standard: string;
    premium: string;
}

const Title = styled(Typography)({
    width: "34%",

    [theme.breakpoints.down("sm")]: {
        width: "40%",
        fontSize: 13
    }
});

const Free = styled(Typography)({
    width: "22%",

    [theme.breakpoints.down("sm")]: {
        width: "20%",
        fontSize: 13
    }
});

const Standard = styled(Typography)({
    width: "22%",

    [theme.breakpoints.down("sm")]: {
        width: "20%",
        fontSize: 13
    }
});

const Premium = styled(Typography)({
    width: "22%",

    [theme.breakpoints.down("sm")]: {
        width: "20%",
        fontSize: 13
    }
});

const PlanCompareContainer = styled("div")({
    display: "flex",
    height: "100%",
    width: "100%",
    paddingLeft: 30,

    [theme.breakpoints.down("sm")]: {
        marginTop: 5,
        paddingLeft: 15
    }
});

const PlanCompareLayout: React.FC<Props> = props => {
    const { title, free, standard, premium } = props;
    return (
        <PlanCompareContainer>
            <Title variant="h6">{title}</Title>
            <Free variant="h6">{free}</Free>
            <Standard variant="h6">{standard}</Standard>
            <Premium variant="h6">{premium}</Premium>
        </PlanCompareContainer>
    );
};

export default PlanCompareLayout;
