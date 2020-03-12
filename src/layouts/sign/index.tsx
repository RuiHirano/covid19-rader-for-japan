import React from "react";
import { Hidden, Grid, IconButton } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter, match } from "react-router-dom";
import * as H from "history";

const FormGrid = styled(Grid)({});

const ImageGrid = styled(Grid)({});

const ContainerGrid = styled(Grid)({});

const Image = styled("img")({
    width: "100%",
    height: "100%"
});

interface Props {
    className?: string;
    children?: any;
    imgPath: string
    history: H.History;
    location: H.Location;
    match: match;
}

const SignLayout: React.FC<Props> = props => {
    const { children, imgPath, history } = props;

    const handleBack = () => {
        history.goBack();
    };

    return (
        <ContainerGrid container>
            <Hidden smDown>
                <ImageGrid item xl={5} lg={5} md={5}>
                    <Image alt="image" src={imgPath} />
                </ImageGrid>
            </Hidden>
            <FormGrid item xl={7} lg={7} md={7} sm={12} xs={12}>
                <IconButton onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
                {children}
            </FormGrid>
        </ContainerGrid>
    );
};

export default withRouter(SignLayout);

