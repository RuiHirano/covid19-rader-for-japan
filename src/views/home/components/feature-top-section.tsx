import * as React from "react";
import {Divider, Typography} from "@material-ui/core";
import FeatureLayout from "./feature-layout";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import imgPath from "../../../app/assets/app_icon.png";
interface Props {}
interface State {}

const Title = styled(Typography)({
    fontSize: 30,
    margin: 30,
    textAlign: "center",
    color: theme.palette.text.primary,
    height: 30,

    [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        margin: 15
    }
});

const FeatureTopSection: React.FC = () => {
    return (
        <div>
            <Title variant="h3">さあ、トレードの質を向上しよう</Title>
            <FeatureLayout
                isRight={true}
                title={"カレンダーで取引を振り返る"}
                imgPath={imgPath}
                text={
                    "カレンダー機能で日毎の損益を一目で確認することができます。"
                }
            />
            <FeatureLayout
                isRight={false}
                title={"取引をした理由が一目瞭然"}
                imgPath={imgPath}
                text={
                    "取引の動機が一覧になっているため、なぜそのタイミングで取引をしたのかを簡単に振り返ることができます"
                }
            />
            <FeatureLayout
                isRight={true}
                title={"あなたの取引を徹底的に分析"}
                imgPath={imgPath}
                text={
                    "あなたの取引記録から自動で分析します。期待値や破産の確率など、他にはない豊富な統計機能で徹底的に洗い出します。"
                }
            />
            <FeatureLayout
                isRight={false}
                title={"FXや株、仮想通貨などに対応"}
                imgPath={imgPath}
                text={
                    "FX、株、仮想通貨など様々な取引形態に対応しています。それぞれシンプルな登録フォームで簡単に記入できます。"
                }
            />
        </div>
    );
};

export default FeatureTopSection;
