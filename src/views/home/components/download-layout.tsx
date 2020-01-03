import * as React from "react";
import { Button, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

interface Props {
    title: string;
    url: string;
    button1: string;
    button2: string;
    imgPath: string;
}
interface State {}

const DownloadMediaContainer = styled("div")({
    height: "100%",
    width: "100%",

    [theme.breakpoints.down("sm")]: {}
});

const ButtonContainer = styled("div")({
    display: "block",
    marginTop: 20,
    height: 100,

    [theme.breakpoints.down("sm")]: {
        marginTop: 20,
        height: 35
    }
});

const Image = styled("img")({
    height: 200,
    width: 200,

    [theme.breakpoints.down("sm")]: {}
});

const DownloadButton = styled(Button)({
    height: 48,
    padding: 5,

    [theme.breakpoints.down("sm")]: {
        height: 35
    }
});

const Title = styled(Typography)({
    textAlign: "center"
});

const DownloadLayout: React.FC<Props> = props => {
    const { title, url, button1, button2, imgPath } = props;
    return (
        <DownloadMediaContainer>
            <Title variant="h6">{title}</Title>
            <Image alt="image" src={imgPath} />
            <ButtonContainer>
                <DownloadButton variant="contained" color="primary" disabled>
                    {button1}
                </DownloadButton>
                <DownloadButton variant="contained" color="primary" disabled>
                    {button2}
                </DownloadButton>
            </ButtonContainer>
        </DownloadMediaContainer>
    );
};

export default DownloadLayout;
