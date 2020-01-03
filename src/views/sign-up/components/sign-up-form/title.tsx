import React from "react";
import { Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../../styles/theme";

const TitleText = styled(Typography)({
    marginTop: theme.spacing(3)
});

interface Props {}

const Title: React.FC<Props> = props => {
    return (
        <div>
            <TitleText variant="h2">Sign up</TitleText>
            <Typography color="textSecondary" gutterBottom>
                Sign up with social media
            </Typography>
        </div>
    );
};

export default Title;
