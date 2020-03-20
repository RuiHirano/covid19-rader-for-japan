import * as React from "react";
import { Typography, Grid, useMediaQuery, colors, Button, CardMedia } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import iconImage from "../../../app/assets/app_icon_alpha.png"
interface Props {
    title: string;
    text: string;
    imgPath: string;
}

const FeatureGrid = styled(Grid)({
    height: 600
});

const DescriptionGrid = styled(Grid)({

    [theme.breakpoints.down("sm")]: {
        textAlign: "center"
    }
});

const Title = styled(Typography)({
    fontSize: 50,
    margin: 30,
    marginTop: 100,
    color: colors.grey[800],
    textAlign: "center",
    width: "100%",
    paddng: 300,

    [theme.breakpoints.down("sm")]: {
        fontSize: 17,
        margin: 15
    }
});


const FeatureLayout: React.FC<Props> = props => {
    const { title, text, imgPath } = props;

    return (
        <FeatureGrid container>
            <DescriptionGrid item xl={12} lg={12} md={12} sm={12} xs={12}>
                {/*<div style={{ height: 50, width: "100%", textAlign: "center" }}>
                    <CardMedia image={iconImage} style={{ height: 100, width: 100, margin: 30, marginTop: 100 }} />
    </div>*/}
                <Title >{title}</Title>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <Button style={{ backgroundColor: theme.palette.primary.main, color: "white", height: 60 }} variant={"contained"}>Trading Managerへアクセス</Button>
                </div>
            </DescriptionGrid>
        </FeatureGrid>
    );
};

export default FeatureLayout;
