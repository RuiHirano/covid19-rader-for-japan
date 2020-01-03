import * as React from "react";
import { Divider, Typography } from "@material-ui/core";
import PlanCompareLayout from "./plan-compare-layout";
import PlanPriceLayout from "./plan-price-layout";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

const Title = styled(Typography)({
    fontSize: 30,
    margin: 20,
    textAlign: "center",
    color: theme.palette.text.primary,
    height: 30,

    [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        margin: 10
    }
});

const SubTitle = styled(Typography)({
    textAlign: "center"
});

const PlanPriceContainer = styled("div")({
    display: "flex",
    height: "100%",
    width: "100%",
    marginBottom: 50,

    [theme.breakpoints.down("sm")]: {
        display: "block",
        marginBottom: 30
    }
});

const PlanSectionContainer = styled("div")({
    height: "100%",
    width: "100%",
    marginBottom: 50
});

const PlanSection: React.FC = () => {
    return (
        <PlanSectionContainer>
            <Title variant="h3">{"選べる3つのプラン"}</Title>
            <SubTitle variant="h6">
                {"あなたにぴったりのプランをお選びください。"}
            </SubTitle>
            <PlanPriceContainer>
                <PlanPriceLayout
                    planName={"Free"}
                    subtext={"まずは手軽に使ってみたい方へ"}
                    price={"0"}
                    benefits={[
                        "カレンダー機能",
                        "豊富な統計機能",
                        "グラフ機能"
                    ]}
                />
                <PlanPriceLayout
                    planName={"Standard"}
                    subtext={"まずは手軽に使ってみたい方へ"}
                    price={"300"}
                    benefits={[
                        "Free Planの全ての機能",
                        "全ての広告を非表示",
                        "画像容量が5MB/月",
                        "検索・絞り込み統計機能",
                        "統計に期待値と破産の確率追加"
                    ]}
                />
                <PlanPriceLayout
                    planName={"Premium"}
                    subtext={
                        "全ての機能を使っていち早くレベルアップをしたい方へ"
                    }
                    price={"500"}
                    benefits={[
                        "Standard Planの全ての機能",
                        "画像容量が無制限",
                        "取引データのCSV抽出機能",
                        "優先的なサポート",
                        "Webアプリと同期可能に"
                    ]}
                />
            </PlanPriceContainer>
            <Title variant="h3">{"プラン比較"}</Title>
            <PlanCompareLayout
                title={"Plan"}
                free={"Free"}
                standard={"Standard"}
                premium={"Premium"}
            />
            <PlanCompareLayout
                title={""}
                free={"¥0/月"}
                standard={"¥300/月"}
                premium={"¥500/月"}
            />
            <PlanCompareLayout
                title={"カレンダー機能"}
                free={"○"}
                standard={"○"}
                premium={"○"}
            />
            <PlanCompareLayout
                title={"統計機能"}
                free={"○"}
                standard={"○"}
                premium={"○"}
            />
            <PlanCompareLayout
                title={"グラフ機能"}
                free={"○"}
                standard={"○"}
                premium={"○"}
            />
            <PlanCompareLayout
                title={"取引履歴表示機能"}
                free={"○"}
                standard={"○"}
                premium={"○"}
            />
            <PlanCompareLayout
                title={"取引詳細表示機能"}
                free={"○"}
                standard={"○"}
                premium={"○"}
            />
            <PlanCompareLayout
                title={"検索/絞り込み機能"}
                free={"×"}
                standard={"○"}
                premium={"○"}
            />
            <PlanCompareLayout
                title={"期待値・破産の確率"}
                free={"×"}
                standard={"○"}
                premium={"○"}
            />
            <PlanCompareLayout
                title={"画像容量"}
                free={"3GB/月"}
                standard={"5GB/月"}
                premium={"無制限"}
            />
            <PlanCompareLayout
                title={"アプリ内広告"}
                free={"表示"}
                standard={"非表示"}
                premium={"非表示"}
            />
            <PlanCompareLayout
                title={"CSV抽出機能"}
                free={"b"}
                standard={"b"}
                premium={"○"}
            />
            <PlanCompareLayout
                title={"Webアプリとの同期"}
                free={"×"}
                standard={"×"}
                premium={"○"}
            />
            <PlanCompareLayout
                title={"サポート"}
                free={"○"}
                standard={"優先"}
                premium={"最優先"}
            />

            <Divider />
        </PlanSectionContainer>
    );
};

export default PlanSection;
