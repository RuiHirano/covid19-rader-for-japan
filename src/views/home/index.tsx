import React from "react";
import {
    ReviewSection,
    HeaderTitle,
    FeatureTopSection,
    FeatureBottomSection,
    DownloadSection,
    PlanSection,
    ImageField,
} from "./components";
import { Home as HomeLayout } from "../../layouts";
import imgPath from "../../app/assets/office.jpg"
import studyImg from "../../app/assets/study.jpg"
import FeatureLayout from "./components/feature-layout";
import FeatureLayout2 from "./components/feature-layout2";

const Home: React.FC = () => {
    return (
        <HomeLayout>
            <HeaderTitle />
            <FeatureLayout
                isRight={true}
                title={"カレンダーで取引を\n振り返る"}
                imgPath={imgPath}
                text={
                    "日毎の損益を一目で確認できます。"
                }
            />
            <ImageField imgPath={imgPath} />
            <FeatureLayout
                isRight={false}
                title={"取引をした理由が一目瞭然"}
                imgPath={imgPath}
                text={
                    "取引の動機が一覧になっているため、なぜそのタイミングで取引をしたのかを簡単に振り返ることができます"
                }
            />
            <ImageField imgPath={imgPath} />
            <FeatureLayout
                isRight={false}
                title={"高度な分析"}
                imgPath={imgPath}
                text={
                    "期待値や損益率、破産の確率といった高度な分析を、あなたの代わりに自動で行います。いくつかのグラフで可視化され取引の傾向を分析できます。"
                }
            />
            <ImageField imgPath={imgPath} />
            <FeatureLayout
                isRight={false}
                title={"どこからでもアクセス"}
                imgPath={imgPath}
                text={
                    "スマートフォン、タブレット、パソコンのどれからでもアクセスできるので、どこにいても取引を記録できます。"
                }
            />

            <ImageField imgPath={imgPath} />
            <FeatureLayout2
                title={"無料のTradingManagerをお試しください"}
                imgPath={imgPath}
                text={
                    ""
                }
            />

        </HomeLayout>
    );
};

export default Home;
