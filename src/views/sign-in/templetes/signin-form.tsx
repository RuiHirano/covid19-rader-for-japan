import React, { useEffect } from "react";
import { withRouter, match } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import { Typography } from "@material-ui/core";
import SocialSignIn from "../molecules/social-signin";
import EmailSignIn from "../molecules/email-signin";


interface Props {
}

const SignInForm: React.FC<Props> = props => {

      return (
            <Container>
                <TitleText variant="h2">Sign in</TitleText>
                
                <SocialSignIn/>

                <EmailSignIn/>
        </Container>

      );
};

export default withRouter(SignInForm);

const Container = styled("div")({
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 50,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
});

const TitleText = styled(Typography)({
    marginTop: theme.spacing(3)
});