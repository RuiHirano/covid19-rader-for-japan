import React from "react";
import {
    ReviewSection,
    HeaderTitle,
    FeatureTopSection,
    FeatureBottomSection,
    DownloadSection,
    PlanSection
} from "./components";
import { Home as HomeLayout } from "../../layouts";

const Home: React.FC = () => {
    return (
        <HomeLayout>
            <HeaderTitle />
            <FeatureTopSection />
            <DownloadSection />
            <PlanSection />
            <FeatureBottomSection />
            <ReviewSection />
        </HomeLayout>
    );
};

export default Home;
