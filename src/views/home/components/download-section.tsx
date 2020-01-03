import * as React from "react";
import DownloadLayout from "./download-layout";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import { Typography, Grid } from "@material-ui/core";
import imgPath from "../../../app/assets/app_icon.png";

const Title = styled(Typography)({
    fontSize: 30,
    color: theme.palette.text.primary,
    height: 30,

    [theme.breakpoints.down("sm")]: {
        fontSize: 20
    }
});

const DownloadGrid = styled(Grid)({
    textAlign: "center",
    alignSelf: "center"
});

const TitleGrid = styled(Grid)({
    textAlign: "center"
});

const MediaGrid = styled(Grid)({
    height: 370,
    width: "100%"
});

const DownloadSection: React.FC = () => {
    return (
        <DownloadGrid container>
            <TitleGrid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Title variant="h3">{"ダウンロード"}</Title>
            </TitleGrid>
            <MediaGrid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <DownloadLayout
                    title={"Mobile"}
                    url={""}
                    button1={"GooglePlayで手に入れよう"}
                    button2={"App Storeからダウンロード"}
                    imgPath={imgPath}
                />
            </MediaGrid>
            <MediaGrid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <DownloadLayout
                    title={"PC/Mac"}
                    url={""}
                    button1={"Mac App Storeからダウンロード"}
                    button2={"Microsoft Storeからダウンロード"}
                    imgPath={imgPath}
                />
            </MediaGrid>
        </DownloadGrid>
    );
};

export default DownloadSection;
