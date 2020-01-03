import React from "react";
import { Typography } from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import {
    Facebook as FacebookIcon,
    Google as GoogleIcon
} from "../../../../icons";
import { styled } from "@material-ui/core/styles";
import theme from "../../../../styles/theme";

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

interface Props {}

const SocialIcon: React.FC<Props> = props => {
    return (
        <div>
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
            <Sugestion align="center" color="textSecondary" variant="body1">
                or login with email address
            </Sugestion>
        </div>
    );
};

export default SocialIcon;
