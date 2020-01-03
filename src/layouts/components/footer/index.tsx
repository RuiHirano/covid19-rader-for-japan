import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

const CompanyName = styled(Typography)({
    textAlign: "left",
    paddingTop: 20,
    paddingLeft: 30
});

const Mission = styled(Typography)({
    textAlign: "left",
    paddingTop: 10,
    paddingLeft: 30
});

const FooterContainer = styled("div")({
    height: 150,
    width: "100%",

    [theme.breakpoints.down("sm")]: {}
});

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <CompanyName variant="h3" className={"title"}>
                FelixPort.Inc
            </CompanyName>
            <Mission variant="h6" className={"description"}>
                より便利に、より幸せに。
            </Mission>
        </FooterContainer>
    );
};

export default Footer;
