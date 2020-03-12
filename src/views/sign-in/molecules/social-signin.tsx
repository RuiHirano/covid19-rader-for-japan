import React, { useEffect } from "react";
import { withRouter, match } from "react-router-dom";
import * as H from "history";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import { Typography, Grid, Button } from "@material-ui/core";
import {
    Facebook as FacebookIcon,
    Google as GoogleIcon
} from "../../../icons";



interface Props {
    history: H.History;
    location: H.Location;
    match: match;
}

const SocialSignIn: React.FC<Props> = props => {
    const { history } = props

    //const {signIn, status} = useSignIn()

      return (
        <div>   
            <Typography color="textSecondary" gutterBottom>
                Sign in with social media
            </Typography>
            <SocialButtonGrid container spacing={2}>
                <Grid item>
                    <Button
                        color="primary"
                        onClick={() => console.log("Facebook")}
                        size="large"
                        variant="contained"
                    >
                        <FacebookSocialIcon />
                        Login with Facebook
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => console.log("Google")}
                        size="large"
                        variant="contained"
                    >
                        <GoogleSocialIcon />
                        Login with Google
                    </Button>
                </Grid>
            </SocialButtonGrid>
            

         </div>
      );
};

export default withRouter(SocialSignIn);

const SocialButtonGrid = styled(Grid)({
    marginTop: theme.spacing(3)
});

const FacebookSocialIcon = styled(FacebookIcon)({
    marginRight: theme.spacing(1)
});

const GoogleSocialIcon = styled(GoogleIcon)({
    marginRight: theme.spacing(1)
});

const Sugestion = styled(Typography)({
    marginTop: theme.spacing(2)
});
