import React from "react";
import {
    ReviewSection,
    HeaderTitle,
    FeatureTopSection,
    FeatureBottomSection,
    DownloadSection,
    PlanSection
} from "./components";

const Home: React.FC = () => {
    return (
        <div>
            <HeaderTitle />
            <FeatureTopSection />
            <DownloadSection />
            <PlanSection />
            <FeatureBottomSection />
            <ReviewSection />
        </div>
    );
};

export default Home;
