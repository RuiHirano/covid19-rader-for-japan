import * as React from "react";
import {Divider, Typography} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

interface Props {
    rate: number;
    text: string;
}

const ReviewContainer = styled("div")({
    height: 150,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 30,
    margin: 5,
    padding: 5,

    [theme.breakpoints.down("sm")]: {
        marginBottom: 10
    }
});

const Star = styled(Typography)({
    textAlign: "center"
});

const Description = styled(Typography)({
    textAlign: "center"
});

const ReviewLayout: React.FC<Props> = props => {
    const { rate, text } = props;
    return (
        <ReviewContainer>
            <Star variant="h6">{String(rate) + " /5"}</Star>
            <Description variant="body1">{text}</Description>
        </ReviewContainer>
    );
};

export default ReviewLayout;
