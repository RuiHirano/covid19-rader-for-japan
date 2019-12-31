import React from "react";

import HeaderTitle from "./components/HeaderTitle";
import FeatureTopSection from "./components/FeatureTopSection";
import FeatureBottomSection from "./components/FeatureBottomSection";
import DownloadSection from "./components/DownloadSection";
import PlanSection from "./components/PlanSection";
import ReviewSection from "./components/ReviewSection";
import styled from "styled-components";
import Footer from "./components/Footer";

const HeaderTitle2 = styled(HeaderTitle)`
    height: 300px
	margin: 50px
`;

const Landing: React.FC = () => {
    return (
        <div>
            <HeaderTitle2 />
            <FeatureTopSection />
            <DownloadSection />
            <PlanSection />
            <FeatureBottomSection />
            <ReviewSection />
            <Footer />
        </div>
    );
};

export default Landing;
