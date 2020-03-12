import React, { useEffect } from "react";
import { withRouter, match } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import { Typography } from "@material-ui/core";
import EmailSignUp from "../molecules/email-signup";


interface Props {
}

const SignUpForm: React.FC<Props> = props => {

      return (
            <Container>
                <TitleText variant="h2">Sign up</TitleText>

                <EmailSignUp/>
        </Container>

      );
};

export default withRouter(SignUpForm);

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