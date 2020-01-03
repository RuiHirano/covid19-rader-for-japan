import React, { useEffect } from "react";
import { Grid, Hidden } from "@material-ui/core";
import ImageField from "./components/image-field";
import BackButton from "./components/back-button";
import SignUpForm from "./components/sign-up-form";
import { withRouter, match } from "react-router";
import { LoadingState } from "../../types";
import * as H from "history";
import { useLoading } from "../../common/hooks/useLoading";
import { styled } from "@material-ui/core/styles";
import theme from "../../styles/theme";

interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}

const SignUpContainer: React.FC<ContainerProps> = props => {
    const { history } = props;

    const { isLoading, isFinishLoading } = useLoading(LoadingState.SIGN_UP);

    useEffect(() => {
        if (isFinishLoading) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    return <SignUp />;
};

export default withRouter(SignUpContainer);

interface Props {}

const SignUp: React.FC<Props> = props => {
    return (
        <ContainerGrid container>
            <Hidden smDown>
                <ImageGrid item xl={5} lg={5} md={5}>
                    <ImageField />
                </ImageGrid>
            </Hidden>
            <FormGrid item xl={7} lg={7} md={7} sm={12} xs={12}>
                <BackButton />
                <SignUpForm />
            </FormGrid>
        </ContainerGrid>
    );
};

const FormGrid = styled(Grid)({});

const ImageGrid = styled(Grid)({});

const ContainerGrid = styled(Grid)({});
