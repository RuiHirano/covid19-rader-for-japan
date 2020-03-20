import * as React from "react";
import { CardMedia } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

const ImageFieldContainer = styled("div")({
    backgroundColor: theme.palette.primary.dark,
    height: 400,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        height: 300
    }
});

interface Props {
    imgPath: string
}

const ImageField: React.FC<Props> = (props) => {
    const { imgPath } = props
    return (
        <ImageFieldContainer>
            <CardMedia image={imgPath} style={{ height: "100%" }}>
            </CardMedia>
        </ImageFieldContainer>
    );
};

export default ImageField;
