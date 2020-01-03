import * as React from "react";
import FeatureLayout from "./feature-layout";
import imgPath from "../../../app/assets/app_icon.png";

const FeatureBottomSection: React.FC = () => {
    return (
        <div>
            <FeatureLayout
                isRight={true}
                title={"まずはダウンロード。"}
                text={
                    "モバイル版は App Store, Google Playで、Web版はMicrosoft Store, Mac App Storeでダウンロードが可能です。"
                }
                imgPath={imgPath}
            />
            <FeatureLayout
                isRight={false}
                title={"無料体験をしよう。"}
                text={
                    "Standard, Premium プランは1ヶ月の無料体験期間を楽しむことができます。プランのキャンセルは、簡単にすぐ行えます。解約金などは一切ございません。"
                }
                imgPath={imgPath}
            />
        </div>
    );
};

export default FeatureBottomSection;
