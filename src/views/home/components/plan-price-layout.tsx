import * as React from "react";
import { Divider, Typography, Grid } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

interface Props {
    planName: string;
    subtext: string;
    price: string;
    benefits: string[];
}

const PlanName = styled(Typography)({
    textAlign: "center",
    margin: 20,

    [theme.breakpoints.down("sm")]: {
        fontSize: 50,
        margin: 15
    }
});

const Description = styled(Typography)({
    textAlign: "center",
    height: 40,
    paddingLeft: 20,
    paddingRight: 20
});

const Price = styled(Typography)({
    textAlign: "center",
    margin: 20,

    [theme.breakpoints.down("sm")]: {
        margin: 15
    }
});

const PriceMonth = styled(Typography)({
    textAlign: "center"
});

const BenefitContainer = styled("div")({
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 10,
    width: "100%"
});

const BenefitGrid = styled(Grid)({
    textAlign: "left",
    width: "100%",
    paddingLeft: 50,
    height: 170,

    [theme.breakpoints.down("sm")]: {
        paddingLeft: 100
    }
});

const PlanType = styled(Typography)({
    textAlign: "center",
    margin: 20,

    [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        margin: 15
    }
});

const PlanPriceContainer = styled("div")({
    height: "100%",
    width: "100%"
});

const BenefitName = styled(Typography)({
    [theme.breakpoints.down("sm")]: {}
});

const PlanCompareLayout: React.FC<Props> = props => {
    const { planName, subtext, price, benefits } = props;
    return (
        <PlanPriceContainer>
            <PlanName variant="h2">{planName}</PlanName>
            <Description variant="body1">{subtext}</Description>
            <Price variant="h3">{"¥" + price}</Price>
            <PriceMonth variant="h6">{"/ 月"}</PriceMonth>
            <PlanType variant="h6">{planName + " Plan"}</PlanType>
            <BenefitGrid>
                {benefits.map((benefit, index) => (
                    <BenefitName variant="body1">
                        {index + 1 + ". " + benefit}
                    </BenefitName>
                ))}
            </BenefitGrid>
            <Divider />
        </PlanPriceContainer>
    );
};

export default PlanCompareLayout;
