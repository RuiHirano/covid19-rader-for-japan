import React from "react";
import { styled } from "@material-ui/core/styles";
import theme from "../../../../styles/theme";
import imgPath from "../../../../app/assets/app_icon.png";

const Image = styled("img")({
    width: "100%",
    height: "100%"
});

interface Props {}

const ImageField: React.FC<Props> = props => {
    return <Image alt="image" src={imgPath} />;
};

export default ImageField;
