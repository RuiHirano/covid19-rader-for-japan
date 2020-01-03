import * as React from "react";
import {Divider, Typography} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import ReviewLayout from "./review-layout";
import theme from "../../../styles/theme";

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

const SubTitle = styled(Typography)({
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
        fontSize: 17,
        margin: 10
    }
});

const ReviewContainer = styled("div")({
    display: "flex",
    height: "100%",
    width: "100%",
    padding: 15,

    [theme.breakpoints.down("sm")]: {
        display: "block",
        padding: 20
    }
});

const ReviewSection: React.FC = () => {
    return (
        <div>
            <Title variant="h3">{"レビュー"}</Title>
            <SubTitle variant="h6">
                嬉しいお声をたくさんいただいております！
            </SubTitle>
            <ReviewContainer>
                <ReviewLayout
                    rate={5}
                    text={
                        "とても使いやすく、トレーダー視点の定型化されたフォーマットでビジュアル的にもとても良いです。今後も使い続けたいと思います。"
                    }
                />
                <ReviewLayout rate={5} text={"レビュー募集中です！"} />
                <ReviewLayout rate={5} text={"レビュー募集中です！"} />
            </ReviewContainer>
            <Divider />
        </div>
    );
};

export default ReviewSection;
