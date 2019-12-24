import * as React from "react";
import renderer from "react-test-renderer";
import { configure, shallow, mount } from "enzyme";
import { BackButton, Form } from "../components";
import { mockItems } from "../../../common/mockData";
import EntryForm from "../EntryForm";

describe("スクリーンショットテスト", () => {
    const item = mockItems[0];
    it("Snapshot of <Form />", () => {
        const form = shallow(
            <Form
                initialValues={{
                    ID: item.ID,
                    MarketType: item.MarketType,
                    StartDate: item.StartDate,
                    EndDate: item.EndDate,
                    TradeType: item.TradeType,
                    Pair: item.Pair,
                    Lot: item.Lot,
                    EntryRate: item.EntryRate,
                    LossCutRate: item.LossCutRate,
                    SettleRate: item.SettleRate,
                    Profit: item.Profit,
                    BeforeComment: item.BeforeComment,
                    AfterComment: item.AfterComment,
                    Tags: item.Tags,
                    Images: item.Images,
                    UpdatedAt: item.UpdatedAt,
                    CreatedAt: item.CreatedAt
                }}
            />
        );
        expect(form).toMatchSnapshot();
    });

    it("Snapshot of <BackButton />", () => {
        const backButton = shallow(<BackButton handleBack={jest.fn()} />);
        expect(backButton).toMatchSnapshot();
    });

    it("Snapshot of <BackButton />", () => {
        const entryForm = shallow(<EntryForm items={mockItems} />);
        expect(entryForm).toMatchSnapshot();
    });
});

describe("機能テスト", () => {
    it.todo("モックデータが正しく表示される");
    it.todo("newとeditで分岐ができている");
    it.todo("バックボタンを押すとアラートがでる");
    it.todo("全て入力されると登録ボタンが押せる");
    it.todo("登録ボタンを押すと登録関数が呼ばれる");
    it.todo("登録が完了したらdashboardに戻る");
});
