import React from "react";

import HeaderTitle from "./components/HeaderTitle";
import FeatureTopSection from "./components/FeatureTopSection";
import FeatureBottomSection from "./components/FeatureBottomSection";
import DownloadSection from "./components/DownloadSection";
import PlanSection from "./components/PlanSection";
import ReviewSection from "./components/ReviewSection";
import Footer from "./components/Footer";

const Landing: React.FC = () => {
    return (
        <div>
            <HeaderTitle />
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
